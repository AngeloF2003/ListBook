import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ReadBookComponent } from "./components/read-book/read-book.component";
const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'list/books/read',
    component: ReadBookComponent
  },

  {path:'**',
  component: HomeComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
