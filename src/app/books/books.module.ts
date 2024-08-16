import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { BookPipe } from './pipe/book.pipe';
import { ReadBookComponent } from './components/read-book/read-book.component';
import { BookRoutingModule } from './book-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    HomeComponent,
    CardListComponent,
    BookPipe,
    ReadBookComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
   FontAwesomeModule
  ],
  exports: []
})
export class BooksModule { }
