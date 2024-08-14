import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Library, SearchResponse } from '../interface/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public bookList: Library[] = [];
  private _tagsHistory: string []=[];

  constructor(private http:HttpClient) {
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
//metodo para guardar el local cuando se agregue a lista de lectura
  if(this.tagsHistory.length === 0) return;
  this.searchTag(this.tagsHistory[0]);
}

  searchTag(tag:string):void{
    if(tag.length === 0) return;

 this.http.get<SearchResponse>('../../assets/data/books.json')
    .subscribe(resp => {

      const filteredBooks = resp.library.filter(item => {
        const book = item.book;
        return book.title.toLowerCase().includes(tag.toLowerCase()) ||
               book.genre.toLowerCase().includes(tag.toLowerCase()) ||
               book.author.name.toLowerCase().includes(tag.toLowerCase());
      });
      this.bookList = filteredBooks;
      this.saveLocalStorage();
      console.log({book: this.bookList});
    });
  }
}
