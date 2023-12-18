import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PaginationComponent],
  providers: [],
  exports: [PaginationComponent]
})
export class PaginationComponentModule {
}
