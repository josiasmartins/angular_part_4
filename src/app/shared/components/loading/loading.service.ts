import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { LoadingType } from './loading-type';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  public loadingSubject: Subject<LoadingType> = new Subject<LoadingType>();

  public getLoading() {
    return this.loadingSubject
      .asObservable()
      // 
      .pipe(startWith(LoadingType.STOPPED))
  }

  public start() {
    this.loadingSubject.next(LoadingType.LOADING);
  }

}