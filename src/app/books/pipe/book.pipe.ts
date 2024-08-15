import { Pipe, type PipeTransform } from '@angular/core';
import { Book } from '../interface/book.interface';

@Pipe({
  name: 'filtro',
})
export class BookPipe implements PipeTransform {

  transform(books: Book[], page: number = 0): Book[] {

    return books.slice(page, page +4);
  }

}
