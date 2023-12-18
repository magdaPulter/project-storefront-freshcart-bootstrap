import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryCardComponent } from './category-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CategoryCardComponent],
  providers: [],
  exports: [CategoryCardComponent]
})
export class CategoryCardComponentModule {
}
