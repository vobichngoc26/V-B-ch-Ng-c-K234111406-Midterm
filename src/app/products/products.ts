import { Component } from '@angular/core';
import { ProductService } from '../myserivces/product-service';
import { HttpClient } from '@angular/common/http';
import { Cartservice } from '../myserivces/cartservice';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: any[] = []
  filteredProducts: any[] = []

  price: number | null = null
  category: string = ""

  constructor(
    private http: HttpClient,
    private cartService: Cartservice
  ) {}

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.http.get<any[]>("http://localhost:3002/products")
      .subscribe(data => {
        this.products = data
        this.filteredProducts = data
      })
  }
  searchPrice() {

    this.filteredProducts = this.products.filter(p => {

      const priceMatch = !this.price || p.price <= this.price
      const categoryMatch = !this.category || p.category === this.category

      return priceMatch && categoryMatch

    })

  }
  searchCategory() {

    this.filteredProducts = this.products.filter(p => {

      const priceMatch = !this.price || p.price <= this.price
      const categoryMatch = !this.category || p.category === this.category

      return priceMatch && categoryMatch

    })

  }
  buy(product: any) {

    const user = localStorage.getItem("username")

    if (!user) {
      alert("Please login first")
      return
    }

    this.cartService.add(product)

    alert("Product added to cart")

  }

}
