import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ProductQueryModel } from 'src/app/query-models/product.query-model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent {
  @Input() categories!: ProductQueryModel[]
}
