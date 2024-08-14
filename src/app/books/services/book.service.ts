import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, SearchResponse } from '../interface/book.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public bookList: Book[] = [];
  private _tagsHistory: string []=[];

  constructor(private http:HttpClient) {
    this.saveLocalStorage();
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

private saveLocalStorage():void{
  localStorage.setItem('books', JSON.stringify(this.bookList))
}

private loadLocalStorage():void{
  if(!localStorage.getItem('books')) return;
  this.bookList = JSON.parse(localStorage.getItem('books')!);
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
}
