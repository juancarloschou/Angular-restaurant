import { Routes } from '@angular/router';

import { MenuComponent } from '../paginas/menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../paginas/home/home.component';
import { AboutComponent } from '../paginas/about/about.component';
import { ContactComponent } from '../paginas/contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dishdetail/:id', component: DishdetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];