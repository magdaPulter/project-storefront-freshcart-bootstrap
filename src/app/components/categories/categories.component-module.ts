import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';

@NgModule({
  imports: [RouterModule,CommonModule],
  declarations: [CategoriesComponent],
  providers: [],
  exports: [CategoriesComponent]
})
export class CategoriesComponentModule {
}
