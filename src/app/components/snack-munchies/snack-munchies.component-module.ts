import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnackMunchiesComponent } from './snack-munchies.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SnackMunchiesComponent],
  providers: [],
  exports: [SnackMunchiesComponent]
})
export class SnackMunchiesComponentModule {
}
