import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SourceModule } from './source/source.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SourceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
