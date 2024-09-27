import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
  
      this.authService.register(registerData).subscribe(response => {
        alert('Kayıt başarılı!');
        this.router.navigate(['/login']);
      }, error => {
        console.error('Kayıt hatası:', error);
        alert('Kayıt başarısız, lütfen bilgilerinizi kontrol edin.');
      });
    }
  }
}
