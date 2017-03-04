import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Rx';

import { User } from './user.interface';

@Injectable()
export class AuthService {

  //private _showNavBar = new BehaviorSubject<boolean>(null);
  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;

  constructor(private router: Router) {}

  signIn(user: User) {
    if ((user.email === 'user@email.com' || user.email === 'usuario@email.com') 
      && user.password === '123456'){
      this.authenticated = true;
      this.showNavBar(true);
      this.router.navigate(['/']);
    } else {
      this.authenticated = false;
    }
  }

  logout() {
    this.authenticated = false;
    this.showNavBar(false);
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.authenticated;
  }

  private showNavBar(ifShow: boolean) {
     this.showNavBarEmitter.emit(ifShow);
  }
}
