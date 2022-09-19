import { Directive, Renderer, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { ElementRef } from "@angular/core";
import { UserService } from "../../../core/user/user.service";

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit { 

  public currentDisplay: string;
    
    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) {}

    ngOnInit(): void {
      // getComputedStyle: pega o estilo do display atual;
      this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
      this.userService.getUser().subscribe(user => {
        if (user) {
          this.renderer.setElementStyle(this.element.nativeElement, 'display', this.currentDisplay)
        } else {
          this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
          this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none')
        }
      });
    }
}