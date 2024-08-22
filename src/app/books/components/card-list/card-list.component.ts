import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../interface/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  @ViewChild('txtTagInput')
  public TagInput!    : ElementRef<HTMLInputElement>;
  public search       : string = '';
  public books        : Book[]=[];
  public page         : number = 0;
  public readingList  : Book[] = [];
  public filteredBooks: Book[] = [];
  public selectedGenre: string = '';
  public totalBooks   : number = 0;
  public totalReadingListBooks: number = 0;
  public totalFilteredBooks   : number = 0;
  public rangePages : string = '';


  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
      this.listAll();

      this.bookService.readingList$.subscribe(readingList => {
        this.updateReadingList(readingList);
        this.applyFilters();
      });
  }

  listAll(): void {
    this.selectedGenre = '';
    this.search = '';
    this.rangePages='';
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = this.books.map(book => {
        return this.isInReadingList(book) ? { ...book, inReadingList: true } : book;
      });

      this.applyFilters();
    });
  }

  updateReadingList(readingList: Book[]): void {
    this.readingList = readingList;
  }

  filterByGenre(genre: string): void {
    this.selectedGenre = genre;
    this.applyFilters();
  }

  filterByPages(range: string){
    this.rangePages = range;
    this.applyFilters();
  }

  applyFilters(): void {

    this.filteredBooks = this.books;
    if (this.search) {
      this.filteredBooks = this.filteredBooks.filter(book =>
        book.title.toUpperCase().includes(this.search.trim().toUpperCase()) ||
        book.author.name.toUpperCase().includes(this.search.trim().toUpperCase()) ||
        book.genre.toUpperCase().includes(this.search.trim().toUpperCase())
      );
    }

    if (this.selectedGenre) {
      this.filteredBooks = this.filteredBooks.filter(book =>
        book.title.toUpperCase() === this.selectedGenre.toUpperCase() ||
        book.author.name.toUpperCase() === this.selectedGenre.toUpperCase() ||
        book.genre.toUpperCase() === this.selectedGenre.toUpperCase()
      );
    }

    if (this.rangePages) {
      if (this.rangePages === '<100') {
        this.filteredBooks = this.filteredBooks.filter(book => book.pages < 100);
      } else if (this.rangePages === '100-200') {
        this.filteredBooks = this.filteredBooks.filter(book => book.pages >= 100 && book.pages <= 200);
      } else if(this.rangePages === '200-300'){
        this.filteredBooks = this.filteredBooks.filter(book => book.pages >= 200 && book.pages <= 300);
      } else if(this.rangePages === '300-400'){
        this.filteredBooks = this.filteredBooks.filter(book => book.pages >= 300 && book.pages <= 400);
      } else if(this.rangePages === '>400'){
        this.filteredBooks = this.filteredBooks.filter(book => book.pages > 400);
      }
    }

    this.totalBooks = this.books.length - this.readingList.length;
    this.totalReadingListBooks = this.readingList.length;
  }


  nextPage(){
    this.page += 3;
  }


  prevPage(){
    if(this.page > 0)
    this.page -=3;
  }

  searchTag(): void {
    const newTag = this.TagInput.nativeElement.value.trim();
    this.TagInput.nativeElement.value = '';
    this.search = newTag;
    this.applyFilters();
  }

  addToReadingList(book: Book): void {
    if (!this.isInReadingList(book)) {
      this.bookService.addBookToReadingList(book);
    }
  }

  removeFromReadingList(book: Book): void {
    if (this.isInReadingList(book)) {
      this.bookService.removeBookFromReadingList(book);
    }
  }

  isInReadingList(book: Book): boolean {
    return this.readingList.some(b => b.ISBN === book.ISBN);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (value.startsWith(' ')) {
      value = value.replace(/^\s+/, '');
      input.value = value;
    }
  }
}


