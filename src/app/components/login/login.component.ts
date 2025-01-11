import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../data/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  AuthService = inject(AuthenticationService);

  currentUser: User = {
    id: 0,
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  obtenerCredenciales(loginForm: NgForm) {
    if (loginForm.invalid) {
      loginForm.control.markAllAsTouched();
      return;
    }

    this.AuthService.login(this.currentUser).subscribe({
      next: (response) => {
        if (response.status === 1) {
          // Guardar el username y password en el local storage
          localStorage.setItem('username', this.currentUser.username);
          localStorage.setItem('password', this.currentUser.password);
          // Redirigir al usuario a la página de inicio
          this.router.navigate(['/dashboard']);
        } else {
          // Mostrar un mensaje de error
          alert(response.message.toString());
        }
      },
      error: (error: HttpErrorResponse) => {
        // Mostrar un mensaje de error basado en el error de la API
        alert(error.error.message || 'Error desconocido');
      }
    });
  }
}
