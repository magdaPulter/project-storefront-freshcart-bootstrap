import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CategoriesComponentModule } from "../categories/categories.component-module";

@NgModule({
    declarations: [HomeComponent],
    providers: [],
    exports: [HomeComponent],
    imports: [RouterModule, CommonModule, CategoriesComponentModule]
})
export class HomeComponentModule {
}
