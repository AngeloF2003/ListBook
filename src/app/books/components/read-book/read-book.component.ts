import { Component, OnInit } from '@angular/core';
import { Book } from '../../interface/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})
export class ReadBookComponent implements OnInit {
  readingList: Book[] = [];

  constructor(private bookService: BookService){

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
}
