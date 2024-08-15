import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Book, Library } from '../../interface/book.interface';
import { BookService } from '../../services/book.service';
import { Observable, map } from 'rxjs';

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


  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
      this.listAll();

      this.bookService.readingList$.subscribe(readingList => {
        this.updateReadingList(readingList);
        this.applyFilters();
      });

      const storedReadingList = localStorage.getItem('readingList');
      if (storedReadingList) {
        this.readingList = JSON.parse(storedReadingList);
        this.applyFilters();
      }
  }

  listAll(): void {
    this.selectedGenre = '';
    this.search = '';
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

  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent): void {
    if (event.key === 'readingList') {
      const updatedReadingList = event.newValue ? JSON.parse(event.newValue) : [];
      this.readingList = updatedReadingList;
      this.applyFilters();
    }
  }

  filterByGenre(genre: string): void {
    this.selectedGenre = genre;
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


    this.totalFilteredBooks = this.filteredBooks.length;
    this.totalBooks = this.books.length - this.readingList.length;
    this.totalReadingListBooks = this.readingList.length;
  }


  nextPage(){
    this.page += 4;
  }


  prevPage(){
    if(this.page > 0)
    this.page -=4;
  }

  searchTag(): void {
    const newTag = this.TagInput.nativeElement.value;
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

}


