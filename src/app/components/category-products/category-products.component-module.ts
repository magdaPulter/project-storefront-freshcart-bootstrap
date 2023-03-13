import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryProductsComponent } from './category-products.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CategoryProductsComponent],
  providers: [],
  exports: [CategoryProductsComponent]
})
export class CategoryProductsComponentModule {



  // onLinkClick(categoryId: string){

  // }
}
