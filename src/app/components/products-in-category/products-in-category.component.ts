import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductsWithRatingQueryModel } from 'src/app/query-models/products-with-rating.query-model';

@Component({
  selector: 'app-products-in-category',
  templateUrl: './products-in-category.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsInCategoryComponent {
  @Input() products!: ProductsWithRatingQueryModel[]
  @Input() selectedCategory!: CategoryModel
}
