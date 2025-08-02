import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  lembrar: boolean = false;
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router) { }

  fazerLogin() {
    if (!this.email || !this.senha) {
      return;
    }

    this.loading = true;

    // Simular delay de login
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/admin/dashboard']);
    }, 1500);
  }

  voltarParaLoja() {
    this.router.navigate(['/loja']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle() {
    console.log('Login com Google');
    // Aqui você pode implementar a autenticação com Google
  }
} 