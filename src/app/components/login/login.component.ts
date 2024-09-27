import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (response: any) => {
        console.log('Giriş başarılı!', response);
        
        // Kullanıcı ID'sini ve diğer bilgileri localStorage'a kaydedin
        localStorage.setItem('userId', response.userId); // Burada userId'yi response'tan aldığınıza emin olun
        localStorage.setItem('firstName', response.firstName);
        localStorage.setItem('email', response.email); // Email bilgisini sakla
        // Girişten sonra yönlendirme yapın
        this.router.navigate(['/flights']);
      },
      (error) => {
        console.error('Giriş hatası:', error);
        alert('Giriş başarısız, lütfen bilgilerinizi kontrol edin.');
      }
    );
  }
}
