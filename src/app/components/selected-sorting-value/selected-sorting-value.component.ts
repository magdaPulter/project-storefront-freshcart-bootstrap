import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ProductsWithRatingQueryModel } from 'src/app/query-models/products-with-rating.query-model';
import { SortingValueQueryModel } from 'src/app/query-models/sorting-value.query-model';

@Component({
  selector: 'app-selected-sorting-value',
  templateUrl: './selected-sorting-value.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedSortingValueComponent {
  @Input() selectedSortingValue!: UntypedFormControl
  @Input() filteredProducts!: ProductsWithRatingQueryModel[]
  @Input() sortingValues!: SortingValueQueryModel[]

}
