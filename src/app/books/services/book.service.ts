import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, SearchResponse } from '../interface/book.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readingListSource = new BehaviorSubject<Book[]>(this.getReadingListFromLocalStorage());
  readingList$ = this.readingListSource.asObservable();

  constructor(private http:HttpClient) {

    window.addEventListener('storage', this.onStorageChange.bind(this));
    console.log(this);
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
      const updatedList = [...currentList, book];
      this.updateReadingListInLocalStorage(updatedList);
      this.readingListSource.next(updatedList);
    }
  }

  removeBookFromReadingList(book: Book): void {
    const currentList = this.readingListSource.value;
    const updatedList = currentList.filter(b => b.ISBN !== book.ISBN);
    this.updateReadingListInLocalStorage(updatedList);
    this.readingListSource.next(updatedList);
  }

  private updateReadingListInLocalStorage(list: Book[]): void {
    localStorage.setItem('readingList', JSON.stringify(list));
  }

  private getReadingListFromLocalStorage(): Book[] {
    const list = localStorage.getItem('readingList');
    return list ? JSON.parse(list) : [];
  }

  private onStorageChange(event: StorageEvent): void {
    if (event.key === 'readingList') {
      const updatedList = event.newValue ? JSON.parse(event.newValue) : [];
      this.readingListSource.next(updatedList);
    }
  }
}
