import { Component } from '@angular/core';
import { Cartservice } from '../myserivces/cartservice';

@Component({
  selector: 'app-current-order',
  standalone: false,
  templateUrl: './current-order.html',
  styleUrl: './current-order.css',
})
export class CurrentOrder {
cart:any[]=[]

constructor(private cartService:Cartservice){

this.cart=this.cartService.getCart()

}

remove(item:any){

this.cart=this.cart.filter(p=>p._id!=item._id)

}

changeQty(item:any,event:any){

item.qty=event.target.value

}

getTotal(){

return this.cart.reduce((sum,p)=>sum+p.price*p.qty,0)

}

checkout(){

alert("Payment success")

this.cart.length=0

}

}
