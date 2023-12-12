import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ProductQueryModel } from 'src/app/query-models/product.query-model';

@Component({
  selector: 'app-fruits-vegetables',
  templateUrl: './fruits-vegetables.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FruitsVegetablesComponent {
  @Input() fruitsVegetables!: ProductQueryModel[]
}
