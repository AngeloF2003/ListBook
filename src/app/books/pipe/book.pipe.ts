import { Pipe, type PipeTransform } from '@angular/core';
import { Book } from '../interface/book.interface';

@Pipe({
  name: 'filtro',
})
export class BookPipe implements PipeTransform {

  transform(books: Book[], page: number = 0, search: string= ''): Book[] {

    if(search.length === 0)
    return books.slice(page, page +4);

    const filterBook = books.filter(book => {
      // debugger;
      return book.title.toUpperCase().includes(search.trim().toUpperCase()) ||
       book.genre.toUpperCase().includes(search.trim().toUpperCase()) ||
       book.author.name.toUpperCase().includes(search.trim().toUpperCase())
    });
    return filterBook.slice(page,page +4);


  }

}
