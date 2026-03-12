import { Component } from '@angular/core';
import { AuthService } from '../myserivces/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
username = "";
  password = "";
  role = "customer"; 

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register(){

    if(!this.username || !this.password){
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const data = {
      username: this.username,
      password: this.password,
      role: this.role
    }

    this.auth.register(data).subscribe({
      next: (res:any)=>{
        alert("Register thành công");
        this.router.navigate(['/login']);
      },
      error: (err)=>{
        alert("Register thất bại");
      }
    })
  }
}
