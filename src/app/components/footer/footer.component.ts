import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { StoreModel } from 'src/app/models/store.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() categories!: CategoryModel[];
  @Input() stores!: StoreModel[];
  readonly getToKnowUs: string[] = [
    'Category',
    'About',
    'Blog',
    'Help Center',
    'Our Value',
  ];
}
