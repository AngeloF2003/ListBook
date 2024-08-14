import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { BookPipe } from './pipe/book.pipe';
import { ReadBookComponent } from './components/read-book/read-book.component';
import { BookRoutingModule } from './book-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    CardListComponent,
    BookPipe,
    ReadBookComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ],
  exports: [HomeComponent]
})
export class BooksModule { }
