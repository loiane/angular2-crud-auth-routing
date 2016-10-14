import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
    declarations: [
      HeaderComponent,
      HomeComponent,
      NotFoundComponent
    ],
    exports: [
      HeaderComponent,
      HomeComponent,
      NotFoundComponent
    ]
})
export class SharedModule {}
