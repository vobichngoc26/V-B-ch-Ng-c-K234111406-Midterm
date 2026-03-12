import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');

  showLogin = false;
  showRegister = false;

  openLogin(){
    this.showRegister = false;
    this.showLogin = true;
  }

  openRegister(){
    this.showLogin = false;
    this.showRegister = true;
  }

  closeLogin(){
    this.showLogin = false;
  }

  closeRegister(){
    this.showRegister = false;
  }

}
