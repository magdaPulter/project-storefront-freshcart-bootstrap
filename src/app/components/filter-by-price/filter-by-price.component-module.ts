import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterByPriceComponent } from './filter-by-price.component';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [FilterByPriceComponent],
  providers: [],
  exports: [FilterByPriceComponent]
})
export class FilterByPriceComponentModule {
}
