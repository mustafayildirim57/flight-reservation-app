import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  // Kullanıcı giriş yapmış mı kontrol ediyoruz
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // Token varsa kullanıcı giriş yapmış demektir
  }
  
  getUserName(): string {
    return localStorage.getItem('firstName') || '';  // Kullanıcı adını localStorage'dan al
  }
  

  // Çıkış yapma işlemi
  logout() {
    this.authService.logout();  // AuthService içindeki logout metodunu çağırıyoruz
    window.location.reload();   // Sayfayı yeniliyoruz
  }
}