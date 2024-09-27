import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44336/api/auth';  // Backend API URL

  constructor(private http: HttpClient) { }

  // Kullanıcı girişi
  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);  // Token'ı sakla
        localStorage.setItem('firstName', response.firstName);  // Kullanıcı adını sakla
      })
    );
  }
  

  // Kullanıcı kaydı
  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl + '/register', user);
  }

  // Tüm kullanıcıları getir
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + '/users');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Token var mı kontrol ediyoruz
  }
  
  logout() {
    localStorage.removeItem('token'); // Çıkış yaparken token'ı siliyoruz
  }
}
