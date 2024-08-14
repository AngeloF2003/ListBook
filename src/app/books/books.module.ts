import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CardBookComponent } from './components/card-book/card-book.component';
import { CardListComponent } from './components/card-list/card-list.component';




@NgModule({
  declarations: [
    HomeComponent,
    CardBookComponent,
    CardListComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent]
})
export class BooksModule { }
