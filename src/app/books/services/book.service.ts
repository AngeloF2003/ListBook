import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, SearchResponse } from '../interface/book.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readingListSource = new BehaviorSubject<Book[]>([]);
  readingList$ = this.readingListSource.asObservable();

  constructor(private http:HttpClient) {

    const savedList = JSON.parse(localStorage.getItem('readingList') || '[]');
    this.readingListSource.next(savedList);
  }

  getAllBooks(): Observable<Book[]>
  {
   return this.http.get<SearchResponse>('../../assets/data/books.json')
   .pipe(
    map(this.transformBooks)
   )
  }

  private transformBooks(resp: SearchResponse): Book[]{

    const Allbook: Book[] = resp.library.map(res =>{

      return {
        title:    res.book.title,
        pages:   res.book.pages,
        genre:   res.book.genre,
        cover:   res.book.cover,
        synopsis: res.book.synopsis,
        year:    res.book.year,
        ISBN:   res.book.ISBN,
        author:  res.book.author,

      }
    })
    return Allbook
  }

  addBookToReadingList(book: Book): void {
    const currentList = this.readingListSource.value;

    if (!currentList.some(b => b.ISBN === book.ISBN)) {
      currentList.push(book);
      this.readingListSource.next(currentList);
      localStorage.setItem('readingList', JSON.stringify(currentList));
    }

  }

  removeBookFromReadingList(book: Book) {
    const currentList = this.readingListSource.value.filter(b => b.title !== book.title);
    this.readingListSource.next(currentList);
    localStorage.setItem('readingList', JSON.stringify(currentList));
  }
}
