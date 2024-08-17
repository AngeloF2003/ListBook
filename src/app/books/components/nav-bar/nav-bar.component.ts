import { Component, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'nav-bar-book',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  navScrolled = false;
  constructor(private elemento: ElementRef){

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (scroll > 20) {
      this.navScrolled = true;
    } else {
      this.navScrolled = false;
    }
  }

  mostrarMenu() {

    const menu = this.elemento.nativeElement.querySelector('#header');
    const nav = this.elemento.nativeElement.querySelector('#nav');

    menu.classList.toggle('move_content');
    nav.classList.toggle('move_nav');
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 760) {
      const menu = this.elemento.nativeElement.querySelector('#header');
      const nav = this.elemento.nativeElement.querySelector('#nav');

      menu.classList.remove('move_content');
      nav.classList.remove('move_nav');
    }
  }
}
