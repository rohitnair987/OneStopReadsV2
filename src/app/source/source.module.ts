import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ListComponent, DetailsComponent],
  exports: [ListComponent]
})

export class SourceModule { }
