import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '../login/login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class LoginModule { }
