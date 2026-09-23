import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  isLoading = false;
  message = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
  this.message = '';

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  
  this.authService.login(
    this.loginForm.getRawValue()
  ).subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);
      console.log('JWT:', response.token);
      this.router.navigate(['/profile']);
    },
    error: () => {
      this.message = 'Invalid username or password';
    }
  });
}
}