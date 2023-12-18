import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryProductsComponent } from './category-products.component';
import { RatingComponentModule } from "../rating/rating.component-module";
import { PaginationComponentModule } from "../pagination/pagination.component-module";
import { StoreFormComponentModule } from "../store-form/store-form.component-module";

@NgModule({
    declarations: [CategoryProductsComponent],
    providers: [],
    exports: [CategoryProductsComponent],
    imports: [CommonModule, RouterModule, ReactiveFormsModule, RatingComponentModule, PaginationComponentModule, StoreFormComponentModule]
})
export class CategoryProductsComponentModule {
}
