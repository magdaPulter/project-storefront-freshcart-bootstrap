import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, from, of } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
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
export class CategoryProductsComponent implements AfterViewInit {
  readonly storeForm: FormGroup = new FormGroup({})

  readonly activatedRouteParams$: Observable<Params> = this._activatedRoute.params
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll();

  readonly stores$: Observable<StoreModel[]> = this._storeService.getAll().pipe(
    tap((stores) => {
      stores.forEach((store) => {
        this.storeForm.addControl(store.id, new FormControl(false))
      })
    })
  )

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

  readonly filterByPrice: FormGroup = new FormGroup({
    priceFrom: new FormControl(),
    priceTo: new FormControl()
  });

  readonly ratingValue$: Observable<number[]> = of([5, 4, 3, 2])
  readonly ratingValueArray$: Observable<number[][]> = this.ratingValue$.pipe(
    map((rating => rating.map(rate => this._ratingMap(rate)))))

  private _ratingValueRadioSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public ratingValueRadio$: Observable<number[]> = this._ratingValueRadioSubject.asObservable();


  readonly filterValuesCheckbox$: Observable<{stores: Set<string>}> = this.queryParams$.pipe(
    map((queryParams) => ({
      stores: new Set<string>(queryParams['stores'] === undefined ? [] : queryParams['stores'].split(','))
    }))
  )

  readonly searchStore: FormControl = new FormControl('')
 
  readonly products$: Observable<ProductsWithRatingQueryModel[]> = combineLatest([
    this._productService.getAll(),
    this.stores$,
    this.activatedRouteParams$,
    this.selectForm.valueChanges.pipe(startWith({ selectedSortingValue: '' })),
    this.limit$,
    this.pagination$,
    this.filterByPrice.valueChanges.pipe(startWith({ priceFrom: 0, priceTo: 100000 })),
    this.ratingValueRadio$,
    this.filterValuesCheckbox$,
    this.searchStore.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([products, stores, params, sortValues, limit, pagination, filterPriceValue, ratingValueRadio, checkboxValue, searchStore]) => {
      const storeMap = stores.reduce((acc, curr) => {
        return {...acc, [curr.id]: curr.name}
      }, {} as Record<string, string>)
      return products
        .filter(product => product.categoryId === params['categoryId'])
        .map(product => {
          return {
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            storeIds: product.storeIds,
            storeNames: product.storeIds.map(storeIds => storeMap[storeIds]),
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
        .filter(product => product.price >= filterPriceValue.priceFrom && product.price <= filterPriceValue.priceTo)
        .slice(((pagination - 1) * limit), limit * pagination)
        .filter(product => ratingValueRadio.length !== 0 ? Math.floor(product.ratingValue) === this._ratingArrMap(ratingValueRadio) : true)
        .filter(product => checkboxValue.stores.size === 0 || 
           product.storeIds.find((valIs: string) => checkboxValue.stores.has(valIs)))
        .filter(product => searchStore !== '' ? product.storeNames.some(store => store?.toLowerCase().includes(searchStore?.toLowerCase())) : true)
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

  private _ratingArrMap(array: number[]): number {
    return array.reduce((acc, curr) => acc + curr, 0)
  }


  ngAfterViewInit(): void {
    this.filterByPrice.valueChanges.pipe(
      tap((filterByPrice) =>  this._router.navigate(
        [],
        { queryParams: 
          { 
            priceFrom: filterByPrice.priceFrom,
            priceTo: filterByPrice.priceTo 
          }, queryParamsHandling: 'merge' }
      ))
    ).subscribe()
   
    this.storeForm.valueChanges.pipe(
      map((filterValue) => Object.entries(filterValue)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)),
      tap((selectedValue) => selectedValue.length > 0 ? 
         this._router.navigate([],
          { queryParams: { stores: selectedValue.sort().join(',') }, queryParamsHandling: 'merge' }) 
          : this._router.navigate([], { queryParams: {} })
      )
    ).subscribe()
  }

  constructor(private _categoryService: CategoryService, private _storeService: StoreService, private _activatedRoute: ActivatedRoute, private _productService: ProductService, private _router: Router) {
  }

  radioChange(rate: number[]) {
    this._ratingValueRadioSubject.next(rate)
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
