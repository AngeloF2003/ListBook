import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Book } from '../../interface/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})
export class ReadBookComponent implements OnInit {
  readingList: Book[] = [];

  navScrolled = false;
  constructor(private bookService: BookService,
              private elemento: ElementRef){

  }

  ngOnInit(): void {
    this.bookService.readingList$.subscribe(list => {
      this.readingList = list;
      console.log('Lista de lectura actualizada:', this.readingList);
    });
  }

  remove(book: Book){
    return this.bookService.removeBookFromReadingList(book);
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
