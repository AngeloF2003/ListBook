import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Library } from '../../interface/book.interface';

@Component({
  selector: 'app-home-book',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private bookService: BookService) {

}
get books(): Library[]{
  return this.bookService.bookList;
  }
}
