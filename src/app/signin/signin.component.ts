import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {}

  onSignin() {
    this.authService.signIn(this.form.value);
  }

  ngOnInit():any {
    this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    });
  }
}
