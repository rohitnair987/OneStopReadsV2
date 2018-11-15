import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { LoginAndRegisterModule } from './login-and-register/login-and-register.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SourceModule } from './source/source.module';
import { ListComponent } from './source/list/list.component';
import { DetailsComponent } from './source/details/details.component';
import { DetailsGuard } from './source/details/details.guard';
import { NewsComponent } from './news/news.component';
import { RegisterComponent } from "src/app/login-and-register/register/register.component";
import { LoginComponent } from "src/app/login-and-register/login/login.component";
import { SourceAddComponent } from "src/app/source/source-add/source-add.component";

var routes = [
  { path: 'news', component: NewsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'logout', component: LogoutComponent },
  { path: 'sources', component: ListComponent },
  { path: 'sources/add', component: SourceAddComponent },
  { path: 'sources/edit/:id', component: ListComponent },
  { path: 'sources/:id',
    canActivate: [DetailsGuard],
    component: DetailsComponent },
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: '**', redirectTo: 'news', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    SourceModule,
    LoginModule,
    LoginAndRegisterModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // for debugging
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
