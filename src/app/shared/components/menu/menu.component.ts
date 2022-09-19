import { Component } from '@angular/core';

@Component({
  selector: 'ap-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  public isShow = false;


  public toggle() {
    this.isShow = !this.isShow;
  }

}