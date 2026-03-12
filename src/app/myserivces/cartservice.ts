import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cartservice {
  cart:any[]=[]

add(product:any){

let exist=this.cart.find(p=>p._id==product._id)

if(exist){
exist.qty++
}else{
this.cart.push({...product,qty:1})
}

}

getCart(){
return this.cart
}

}
