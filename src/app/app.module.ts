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

// To-do: Once the news page is ready, 
// that should be the default route.
var routes = [
  { path: 'sources', component: ListComponent },
  { path: 'sources/:id',
    canActivate: [ DetailsGuard],
    component: DetailsComponent },
  { path: '', redirectTo: 'sources', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SourceModule,
    LoginModule,
    LoginAndRegisterModule
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
