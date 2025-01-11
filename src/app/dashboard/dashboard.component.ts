import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  username = localStorage.getItem('username');

  constructor(private router: Router) {}

  logout() {
    // Eliminar el username y password del local storage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    // Redirigir al usuario a la página de inicio
    this.router.navigate(['/login']);
  }
}
