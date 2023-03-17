import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, combineLatest, from, of } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { ProductsWithRatingQueryModel } from '../../query-models/products-with-rating.query-model';
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
  readonly stores$: Observable<StoreModel[]> = this._storeService.getAll()


  readonly oneCategory$: Observable<CategoryModel> = this.activatedRouteParams$.pipe(
    switchMap(data => this._categoryService.getOne(data['categoryId'])))

  readonly sortingValues$: Observable<string[]> = of(['Featured', 'Price Low to high', 'Price High to Low', 'Avg. Rating'])
  readonly selectForm: FormGroup = new FormGroup({
    selectedSortingValue: new FormControl('Featured')
  });

  readonly limitButtons$: Observable<number[]> = of([5, 10, 15])
  readonly queryParams$: Observable<Params> = this._activatedRoute.queryParams;
  readonly limit$: Observable<number> = this.queryParams$.pipe(
    map((queryParams) => queryParams['limit'] ? +queryParams['limit'] : 5))
  readonly pagination$: Observable<number> = this.queryParams$.pipe(
    map((queryParams) => queryParams['pagination'] ? queryParams['pagination'] : 1)
  )

  readonly paginationButtons$: Observable<number[]> = combineLatest([
    this._productService.getAll(),
    this.queryParams$
  ]).pipe(
    map(([products, queryParams]) => {
      if (!queryParams['limit']) {
        return [1]
      }
      return Array.from(Array(Math.floor((products.length) / (queryParams['limit'])))
        .keys()).map((n) => n + 1)
    })
  )


  readonly products$: Observable<ProductsWithRatingQueryModel[]> = combineLatest([
    this._productService.getAll(),
    this.activatedRouteParams$,
    this.selectForm.valueChanges.pipe(startWith({ selectedSortingValue: '' })),
    this.limit$,
    this.pagination$
  ]).pipe(
    map(([products, params, sortValues, limit, pagination]) => {
      return products
        .filter(product => product.categoryId === params['categoryId'])

        .map(product => {
          return {
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            featureValue: product.featureValue,
            ratingCount: product.ratingCount,
            ratingValue: product.ratingValue,
            ratingValueArr: this._ratingMap(product.ratingValue)
          }
        })
        .sort((a, b) => {
          if (sortValues.selectedSortingValue === 'Featured') {
            return a.featureValue < b.featureValue ? 1 : -1
          }
          if (sortValues.selectedSortingValue === 'Price Low to high') {
            return a.price > b.price ? 1 : -1
          }
          if (sortValues.selectedSortingValue === 'Price High to Low') {
            return a.price < b.price ? 1 : -1
          }
          return a.ratingValue < b.ratingValue ? 1 : -1
        })
        .slice(((pagination - 1) * limit), limit * pagination)
    })
  )

  private _ratingMap(ratingValue: number): number[] {
    const initialArr = [1, 1, 1, 1, 1]
    if (Number.isInteger(ratingValue)) {
      return initialArr.fill(0, ratingValue)
    }
    const filledArray = initialArr.fill(0, ratingValue)
    filledArray.splice(ratingValue, 1, 0.5)
    return filledArray
  }



  constructor(private _categoryService: CategoryService, private _storeService: StoreService, private _activatedRoute: ActivatedRoute, private _productService: ProductService, private _router: Router) {

  }

  onLimitButtonClicked(limitButton: number) {
    this._router.navigate(
      [],
      { queryParams: { limit: limitButton }, queryParamsHandling: 'merge' }
    )
  }

  onPaginationButtonClicked(paginationButton: number) {
    this._router.navigate(
      [],
      { queryParams: { pagination: paginationButton }, queryParamsHandling: 'merge' }
    )
  }

}
