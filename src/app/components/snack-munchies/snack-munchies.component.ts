import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ProductQueryModel } from 'src/app/query-models/product.query-model';

@Component({
  selector: 'app-snack-munchies',
  templateUrl: './snack-munchies.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackMunchiesComponent {
  @Input() snackMunchies!: ProductQueryModel[]
}
