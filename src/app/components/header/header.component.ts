import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  title = 'Blog Angular';
  isUserLogged: boolean = false
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLogged.subscribe({
      next: (logged) => {
        this.isUserLogged = logged;
      }
    })
  }

  logout(): void {
    if (!this.isUserLogged) return;
    this.authService.logout()
  }
}
