import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CategoriesComponentModule } from "../categories/categories.component-module";
import { FruitsVegetablesComponentModule } from "../fruits-vegetables/fruits-vegetables.component-module";

@NgModule({
    declarations: [HomeComponent],
    providers: [],
    exports: [HomeComponent],
    imports: [RouterModule, CommonModule, CategoriesComponentModule, FruitsVegetablesComponentModule]
})
export class HomeComponentModule {
}
