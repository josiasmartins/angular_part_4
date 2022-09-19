import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  public loading$: Observable<String>;

  constructor(
    private loadingService: LoadingService
  ) { 

  }

  public ngOnInit(): void {
    this.loading$ = this.loadingService
      .getLoading()
      // valueOf: retorna o valor da string da enum
      .pipe(map(loadingType => loadingType.valueOf()))
  }

}