import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryProductsComponent } from './category-products.component';
import { RatingComponentModule } from "../rating/rating.component-module";
import { PaginationComponentModule } from "../pagination/pagination.component-module";
import { StoreFormComponentModule } from "../store-form/store-form.component-module";
import { FilterByPriceComponentModule } from "../filter-by-price/filter-by-price.component-module";
import { SelectedSortingValueComponentModule } from "../selected-sorting-value/selected-sorting-value.component-module";

@NgModule({
    declarations: [CategoryProductsComponent],
    providers: [],
    exports: [CategoryProductsComponent],
    imports: [CommonModule, RouterModule, ReactiveFormsModule, RatingComponentModule, PaginationComponentModule, StoreFormComponentModule, FilterByPriceComponentModule, SelectedSortingValueComponentModule]
})
export class CategoryProductsComponentModule {
}
