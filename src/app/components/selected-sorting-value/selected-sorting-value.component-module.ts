import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectedSortingValueComponent } from './selected-sorting-value.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [SelectedSortingValueComponent],
  providers: [],
  exports: [SelectedSortingValueComponent]
})
export class SelectedSortingValueComponentModule {
}
