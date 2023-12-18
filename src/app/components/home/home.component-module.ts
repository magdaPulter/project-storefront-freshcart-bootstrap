import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CategoriesComponentModule } from "../categories/categories.component-module";
import { StoresComponentModule } from "../stores/stores.component-module";
import { CategoryCardComponentModule } from "../category-card/category-card.component-module";

@NgModule({
    declarations: [HomeComponent],
    providers: [],
    exports: [HomeComponent],
    imports: [RouterModule, CommonModule, CategoriesComponentModule, StoresComponentModule, CategoryCardComponentModule]
})
export class HomeComponentModule {
}
