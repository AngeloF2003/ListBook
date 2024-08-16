import { Component, ElementRef, HostListener } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book, Library } from '../../interface/book.interface';

@Component({
  selector: 'app-home-book',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(){

  }

}
