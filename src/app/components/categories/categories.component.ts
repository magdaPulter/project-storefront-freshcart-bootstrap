import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  @Input() categories!: CategoryModel[]
}
