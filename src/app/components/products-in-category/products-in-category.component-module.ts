import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsInCategoryComponent } from './products-in-category.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProductsInCategoryComponent],
  providers: [],
  exports: [ProductsInCategoryComponent]
})
export class ProductsInCategoryComponentModule {
}
