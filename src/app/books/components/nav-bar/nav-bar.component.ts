import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'nav-bar-book',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  navScrolled = false;
  constructor(private elemento: ElementRef){

  }

  mostrarMenu() {
    const menu = this.elemento.nativeElement.querySelector('#header');
    const nav = this.elemento.nativeElement.querySelector('#nav');

    menu.classList.toggle('move_content');
    nav.classList.toggle('move_nav');
  }

  // Escucha el evento de redimensionamiento de la ventana
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 760) {
      const menu = this.elemento.nativeElement.querySelector('#header');
      const nav = this.elemento.nativeElement.querySelector('#nav');

      menu.classList.remove('move_content');
      nav.classList.remove('move_nav');
    }
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
}
