import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { UserService } from '../../core/user/user.service';
import { ServerLog } from './server-log';
import { ServerLogService } from './server-log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector
  ) {}

  handleError(error: any) {
    console.log('passei pelo handler');

    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLog = this.injector.get(ServerLogService);

    const url = location instanceof PathLocationStrategy
      ? location.path() : '';


    const message = error.message ? error.message : error.toString();
    /**
     * O método StackTrace.fromError transforma a stacktrace
     * de um Error em um array no qual cada item do array é uma stackframe.
     */
    StackTrace
      .fromError(error)
      .then(stackFrames => {
        const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n');

        console.log(message);
        console.log(stackAsString);
        console.log('oque será enviado no servidor');
        serverLog.log({
          message, url,
          userName: userService.getUserName(),
          stack: stackAsString
        }).subscribe(
          () => {
            console.log('Error logged on server')
          },
          err => {
            console.log(err);
            console.log('Fail to send log to server')
          }
        );
      });
  }
}
