import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../data/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  AuthService = inject(AuthenticationService);

  currentUser: User = {
    id: 0,
    username: '',
    password: ''
  }

  constructor(private router: Router) {}

  obtenerCredenciales() {
    this.AuthService.login(this.currentUser).subscribe((response) => {
      if (response.status === 1) {
        // Guardar el username y password en el local storage
        // localStorage.setItem('username', this.currentUser.username);
        // localStorage.setItem('password', this.currentUser.password);
        // Redirigir al usuario a la página de inicio
        this.router.navigate(['/dashboard']);
      }
      else {
        // Mostrar un mensaje de error
        alert('Usuario o contraseña incorrectos');
      }
    })
  }
}
