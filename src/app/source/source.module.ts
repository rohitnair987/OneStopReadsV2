import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ListComponent],
  exports: [ListComponent]
})
export class SourceModule { }
