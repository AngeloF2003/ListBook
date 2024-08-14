import { Injectable } from '@angular/core';
import { Book } from 'src/app/books/interface/book.interface';

@Injectable({
  providedIn: 'root'
})
export class ReadBookService {
private readBooks: Book[] = []

  constructor() { }

}
