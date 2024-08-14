import { Component, ElementRef, ViewChild } from '@angular/core';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'nav-bar-book',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
@ViewChild('txtTagInput') public TagInput!: ElementRef<HTMLInputElement>;

constructor(private bookService: BookService){

}
searchTag (){
  const newTag = this.TagInput.nativeElement.value;
  this.bookService.searchTag(newTag);
  this.TagInput.nativeElement.value='';
  console.log(newTag)
}

}
