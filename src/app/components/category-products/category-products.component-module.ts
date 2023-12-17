import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryProductsComponent } from './category-products.component';
import { RatingComponentModule } from "../rating/rating.component-module";

@NgModule({
    declarations: [CategoryProductsComponent],
    providers: [],
    exports: [CategoryProductsComponent],
    imports: [CommonModule, RouterModule, ReactiveFormsModule, RatingComponentModule]
})
export class CategoryProductsComponentModule {
}
