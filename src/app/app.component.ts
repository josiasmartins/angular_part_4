import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 

  constructor(
    // Router: me dá acesso ao evento
    private router: Router,
    // ActivaredRoute: pega a rota que está sendo ativada no momento
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}


  public ngOnInit(): void {
    /**
     * Uma instância de Router possui a propriedade events, 
     * um Observable que nos permite saber a fase atual da rota acessada pela aplicação.
     */
    this.router.events
    /**
     * Um evento do tipo NavigationEnd é aquele disparado quando a rota termina com sucesso.
     */
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        while(route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(switchMap(route => route.data))
      .subscribe(event => this.titleService.setTitle(event.title));
  }


}
