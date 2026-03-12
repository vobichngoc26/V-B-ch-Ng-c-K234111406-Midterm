import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = "http://localhost:3002";
  constructor(private http: HttpClient) {}
  register(data:any): Observable<any>{
    return this.http.post(this.api + "/register", data, {
      withCredentials:true
    });
  }
  login(data:any): Observable<any>{
    return this.http.post(this.api + "/login", data, {
      withCredentials:true
    });
  }
  logout(): Observable<any>{
    return this.http.post(this.api + "/logout", {},{
      withCredentials:true
    });
  }
}
