import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll();
  readonly stores$: Observable<StoreModel[]> = this._storeService.getAll();

  readonly oneCategory$: Observable<CategoryModel> = this._activatedRoute.params.pipe(
    switchMap(data => this._categoryService.getOne(data['categoryId'])))

  constructor(private _categoryService: CategoryService, private _storeService: StoreService, private _activatedRoute: ActivatedRoute) {
  }
}
