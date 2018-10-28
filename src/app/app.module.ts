import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { LoginAndRegisterModule } from './login-and-register/login-and-register.module';

import { AppComponent } from './app.component';
import { SourceModule } from './source/source.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SourceModule,
    LoginModule,
    LoginAndRegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
