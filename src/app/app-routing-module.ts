import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './login/login';
import { Register } from './register/register';
import { About } from './about/about';
import { NotFound } from './not-found/not-found';
import { Products } from './products/products';
import { CurrentOrder } from './current-order/current-order';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'about', component: About },
  { path: 'product', component: Products },
  { path: 'currentorder', component: CurrentOrder },
  { path: 'about', component: About },
  { path: '**', component: NotFound } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }