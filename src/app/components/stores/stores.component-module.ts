import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoresComponent } from './stores.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [StoresComponent],
  providers: [],
  exports: [StoresComponent]
})
export class StoresComponentModule {
}
