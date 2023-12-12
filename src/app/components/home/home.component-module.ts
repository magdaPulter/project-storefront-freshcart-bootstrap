import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CategoriesComponentModule } from "../categories/categories.component-module";
import { FruitsVegetablesComponentModule } from "../fruits-vegetables/fruits-vegetables.component-module";
import { SnackMunchiesComponentModule } from "../snack-munchies/snack-munchies.component-module";
import { StoresComponentModule } from "../stores/stores.component-module";

@NgModule({
    declarations: [HomeComponent],
    providers: [],
    exports: [HomeComponent],
    imports: [RouterModule, CommonModule, CategoriesComponentModule, FruitsVegetablesComponentModule, SnackMunchiesComponentModule, StoresComponentModule]
})
export class HomeComponentModule {
}
