import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { ProductModel } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsComponent {
  readonly activatedRouteParams$: Observable<Params> = this._activatedRoute.params
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll();
  readonly stores$: Observable<StoreModel[]> = this._storeService.getAll();

  readonly oneCategory$: Observable<CategoryModel> = this.activatedRouteParams$.pipe(
    switchMap(data => this._categoryService.getOne(data['categoryId'])))
  
  readonly products$: Observable<ProductModel[]> = combineLatest([
    this._productService.getAll(),
    this.activatedRouteParams$
  ]).pipe(
    map(([products, params]) => {
      return products.filter(product => product.categoryId === params['categoryId'])
    })
  )
 
  readonly ratingValues$: Observable<number[]> = of([1,2,3,4,5])

  constructor(private _categoryService: CategoryService, private _storeService: StoreService, private _activatedRoute: ActivatedRoute, private _productService: ProductService) {
  }
}
