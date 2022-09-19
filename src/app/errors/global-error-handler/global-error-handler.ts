import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { UserService } from '../../core/user/user.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector
  ) {}

  handleError(error: any) {
    console.log('passei pelo handler');

    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);

    const url = location instanceof PathLocationStrategy
      ? location.path() : '';


    const message = error.message ? error.message : error.toString();
    StackTrace
      .fromError(error)
      .then(stackFrames => {
        const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n');

        console.log(message);
        console.log(stackAsString);
        console.log('oque será enviado no servidor');
        console.log({ message, url, userName: userService.getUserName(), stack: stackAsString });
      })
    // throw error;
  }
}