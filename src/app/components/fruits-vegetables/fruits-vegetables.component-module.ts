import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FruitsVegetablesComponent } from './fruits-vegetables.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FruitsVegetablesComponent],
  providers: [],
  exports: [FruitsVegetablesComponent]
})
export class FruitsVegetablesComponentModule {
}
