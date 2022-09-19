import { ErrorHandler, Injectable } from '@angular/core';
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any) {
    console.log('passei pelo handler');
    StackTrace
      .fromError(error)
      .then(stackFrames => {
        const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n');
        console.log(error);
        console.log(stackAsString);
      })
    // throw error;
  }
}