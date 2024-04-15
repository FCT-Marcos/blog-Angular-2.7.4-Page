import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterRequest } from '../../interfaces/RegisterRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerError = ""
  registerForm = this.formBuilder.group({
    username: ['test', [Validators.required]],
    email: ['asd@gmail.com', [Validators.required, Validators.email]],
    password: ['123', [Validators.required]]
  })

  constructor (private formBuilder: FormBuilder, private router:Router, private authService: AuthService) {}

  get username() {
    return this.registerForm.controls.username
  }

  get email() {
    return this.registerForm.controls.email
  }

  get password() {
    return this.registerForm.controls.password
  }

  register() {
    // Si no es valido salgo
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched() // Marcar todas para ver los errores
      return;
    }

    this.authService.register(this.registerForm.value as RegisterRequest).subscribe({
      error: (errorData) => {
        this.registerError = errorData
      },
      complete: () => {
        this.registerForm.reset()
        this.router.navigateByUrl("/home")
      }
    })

  }

}
