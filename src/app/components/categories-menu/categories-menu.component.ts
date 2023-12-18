import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesMenuComponent {
  @Input() selectedCategory!: CategoryModel
  @Input() categories!: CategoryModel[]

  

}
