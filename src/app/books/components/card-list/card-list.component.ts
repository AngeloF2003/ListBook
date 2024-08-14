import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Book, Library } from '../../interface/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  @ViewChild('txtTagInput')
  public TagInput!: ElementRef<HTMLInputElement>;
  public search: string = '';
  public books: Book[]=[];
  public page: number = 0;


  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
      this.bookService.getAllBooks()
      .subscribe(books => {
        this.books = books
      })
  }

  nextPage(){
    this.page += 4;
  }


  prevPage(){
    if(this.page > 0)
    this.page -=4;
  }

  searchTag (){
    const newTag = this.TagInput.nativeElement.value;
    this.TagInput.nativeElement.value='';
    this.search = newTag;


  }
}
