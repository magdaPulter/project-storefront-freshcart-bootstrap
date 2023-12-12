import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() categories!: CategoryModel[]
}
