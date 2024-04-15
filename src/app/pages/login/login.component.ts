import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service'
import { LoginRequest } from '../../interfaces/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginError = ""
  loginForm = this.formBuilder.group({
    email:['asd@gmail.com', [Validators.required, Validators.email]],
    password:['123', [Validators.required]]
  })

  constructor (private formBuilder: FormBuilder, private router:Router, private authService: AuthService) {}

  get email() {
    return this.loginForm.controls.email
  }

  get password() {
    return this.loginForm.controls.password
  }

  login() {
    // Si no es valido salgo
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched() // Marcar todas para ver los errores
      return;
    }

    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      error: (errorData) => {
        this.loginError = errorData
        this.router.navigateByUrl("/login")
      },
      complete: () => {
        this.loginForm.reset()
        this.router.navigateByUrl("/home")
      }
    })

  }
}
