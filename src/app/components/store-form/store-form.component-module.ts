import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreFormComponent } from './store-form.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  declarations: [StoreFormComponent],
  providers: [],
  exports: [StoreFormComponent]
})
export class StoreFormComponentModule {
}
