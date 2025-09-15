import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

onLogin() {
    this.authService.login( this.username, this.password ).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.access_token);  // store token
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        alert('Login failed: ' + err.error.message);
      }
    });
  }

}
