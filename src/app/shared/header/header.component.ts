import { Component } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private showNavBar: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.authService.showNavBarEmitter.subscribe(
      (mode: boolean) => {
        if (mode !== null) {
          this.showNavBar = mode;
        }
      }
    );
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }

}
