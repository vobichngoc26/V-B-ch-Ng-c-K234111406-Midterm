import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NotFound } from './not-found/not-found';
import { About } from './about/about';
import { Login } from './login/login';
import { Register } from './register/register';
import { Products } from './products/products';
import { CurrentOrder } from './current-order/current-order';
import { Revenue } from './revenue/revenue';

@NgModule({
  declarations: [
    App,
    NotFound,
    About,
    Login,
    Register,
    Products,
    CurrentOrder,
    Revenue
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
   
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }