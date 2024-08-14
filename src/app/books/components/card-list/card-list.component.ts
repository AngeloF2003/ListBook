import { Component, Input } from '@angular/core';
import { Library } from '../../interface/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  @Input()
  public libraries : Library[] = [];

  constructor(private bookService: BookService) {

  }


}
