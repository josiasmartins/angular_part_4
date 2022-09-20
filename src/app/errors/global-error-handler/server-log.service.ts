import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerLog } from './server-log';
import { environment } from 'src/environments/environment';

const API = environment.serverLog;
console.log('api: '+ API);

@Injectable({ providedIn: 'root' })
export class ServerLogService {

  constructor(
    private http: HttpClient
  ) {}

  public log(serverLog: ServerLog) {
    return this.http.post(API + '/infra/log', serverLog)
  }


}
