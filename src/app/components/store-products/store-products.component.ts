import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { ProductModel } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-store-products',
  styleUrls: ['./store-products.component.scss'],
  templateUrl: './store-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreProductsComponent {
  readonly activatedRouteParam$: Observable<Params> = this._activatedRoute.params

  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll()
  readonly stores$: Observable<StoreModel[]> = this._storeService.getAll();

  readonly oneStore$: Observable<StoreModel> = this.activatedRouteParam$.pipe(
    switchMap(data => this._storeService.getOne(data['storeId'])))

  readonly form: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  readonly productsInStore$: Observable<ProductModel[]> = combineLatest([
    this._productService.getAll(),
    this.activatedRouteParam$,
    this.form.valueChanges.pipe(startWith({ search: '' }))
  ]).pipe(
    map(([products, params, formValue]) => {
      return products
        .filter(product => product.storeIds.find(store => store === params['storeId']))
        .filter(product => product.name.toLowerCase().includes(formValue.search.toLowerCase()))
    })
  )

  constructor(private _categoryService: CategoryService, private _activatedRoute: ActivatedRoute, private _storeService: StoreService, private _productService: ProductService) {

  }
}
