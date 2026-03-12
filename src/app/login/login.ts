import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../myserivces/auth-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = "";
  password = "";
  errorMessage = "";

  @Output() closeLogin = new EventEmitter();
  @Output() openRegister = new EventEmitter();

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  login(){

    if(!this.username || !this.password){
      this.errorMessage = "Please enter username and password";
      return;
    }

    const data = {
      username: this.username,
      password: this.password
    };

    this.auth.login(data).subscribe({

      next:(res:any)=>{

        localStorage.setItem("username", res.username);
        localStorage.setItem("role", res.role);

        alert("Login success");

        this.closeLogin.emit();   // đóng popup login

      },

      error:(err:HttpErrorResponse)=>{
        this.errorMessage = err.error?.message || "Login failed";
      }

    });
  }

  goRegister(){
    this.closeLogin.emit();
    this.openRegister.emit();
  }

}