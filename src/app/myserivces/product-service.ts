import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  api = "http://localhost:3002/products"

  constructor(private http: HttpClient) {}

  getProducts(){
    return this.http.get<any[]>(this.api)
  }
}
