import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.interface';

@Injectable()
export class AuthService {

  private authenticated = false;

  constructor(private router: Router) {}

  signIn(user: User) {
    if (user.email === 'user@email.com' && user.password === '123456'){
      this.authenticated = true;
      this.router.navigate(['/']);
    } else {
      this.authenticated = false;
    }
  }

  logout() {
    this.authenticated = false;
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.authenticated;
  }
}
