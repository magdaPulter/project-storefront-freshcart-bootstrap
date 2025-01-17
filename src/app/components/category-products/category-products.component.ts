import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { QueryParamsValueQueryModel } from '../../query-models/query-params-value.query-model';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { SortingValueQueryModel } from '../../query-models/sorting-value.query-model';
import { ProductsWithRatingQueryModel } from '../../query-models/products-with-rating.query-model';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { SortingValuesService } from '../../services/sorting-values.service';
import { QueryParamsService } from '../../services/queryParams.service';
import { FilterValuesService } from '../../services/filterValues.service';
import { ratingMap } from 'src/app/methods/ratingMap';

@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductsComponent {
  readonly storeForm: FormGroup = new FormGroup({});

  readonly filterByPrice: FormGroup = new FormGroup({
    priceFrom: new FormControl(''),
    priceTo: new FormControl(''),
  });

  readonly queryParamsValue$: Observable<QueryParamsValueQueryModel> =
    this._queryParamsService.getQueryParamsValues();

  readonly refreshFilterByPrice$: Observable<{
    priceFrom: string;
    priceTo: string;
  }> = this._filterValuesService.refreshFilterByPrice().pipe(
    tap((price: { priceFrom: string; priceTo: string }) =>
      this.filterByPrice.patchValue(price)
    ),
    shareReplay(1)
  );

  readonly activatedRouteParams$: Observable<Params> =
    this._activatedRoute.params;
  readonly categories$: Observable<CategoryModel[]> =
    this._categoryService.getAll();

  readonly stores$: Observable<StoreModel[]> = this._storeService.getAll().pipe(
    tap((stores) => {
      stores.forEach((store) => {
        this.storeForm.addControl(store.id, new FormControl(false));
      });
    })
  );

  readonly selectedCategory$: Observable<CategoryModel> =
    this.activatedRouteParams$.pipe(
      switchMap((data) => this._categoryService.getOne(data['categoryId']))
    );

  readonly sortingValues: SortingValueQueryModel[] =
    this._sortingValuesService.getSortingValues();

  readonly selectedSortingValue: FormControl = new FormControl(
    'desc-featureValue'
  );

  private _ratingValueRadioSubject: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>([]);
  public ratingValueRadio$: Observable<number[]> =
    this._ratingValueRadioSubject.asObservable();

  readonly filterValuesCheckbox$: Observable<{ stores: Set<string> }> =
    this._filterValuesService.filterValuesCheckbox();

  readonly searchStore: FormControl = new FormControl('');

  ratingValueRadio(rate: number[]) {
    this._ratingValueRadioSubject.next(rate);
  }

  readonly allProducts$: Observable<ProductsWithRatingQueryModel[]> =
    combineLatest([
      this._productService.getAll(),
      this.stores$,
      this.activatedRouteParams$,
      this.selectedSortingValue.valueChanges.pipe(
        startWith('desc-featureValue')
      ),
      this.ratingValueRadio$,
      this.filterValuesCheckbox$,
      this.searchStore.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(
        ([
          products,
          stores,
          params,
          sortValues,
          ratingValueRadio,
          checkboxValue,
          searchStore,
        ]) => {
          const order = sortValues.split('-')[0];
          const property = sortValues.split('-')[1];
          const storeMap = stores.reduce((acc, curr) => {
            return { ...acc, [curr.id]: curr.name };
          }, {} as Record<string, string>);
          return products
            .filter((product) => product.categoryId === params['categoryId'])
            .map((product) => {
              return {
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                storeIds: product.storeIds,
                storeNames: product.storeIds.map(
                  (storeIds) => storeMap[storeIds]
                ),
                featureValue: product.featureValue,
                ratingCount: product.ratingCount,
                ratingValue: product.ratingValue,
                ratingValueArr: ratingMap(product.ratingValue),
              };
            })
            .sort((a: Record<string, any>, b: Record<string, any>) => {
              if (order === 'desc') {
                return a[property] < b[property] ? 1 : -1;
              }
              return a[property] > b[property] ? 1 : -1;
            })
            .filter((product) =>
              ratingValueRadio.length !== 0
                ? Math.floor(product.ratingValue) ===
                  this._ratingArrMap(ratingValueRadio)
                : true
            )
            .filter(
              (product) =>
                checkboxValue.stores.size === 0 ||
                product.storeIds.find((valIs: string) =>
                  checkboxValue.stores.has(valIs)
                )
            )
            .filter((product) =>
              searchStore !== ''
                ? product.storeNames.some((store) =>
                    store?.toLowerCase().includes(searchStore?.toLowerCase())
                  )
                : true
            );
        }
      )
    );

  readonly filteredProducts$: Observable<ProductsWithRatingQueryModel[]> =
    combineLatest([this.allProducts$, this.refreshFilterByPrice$]).pipe(
      map(([products, filterPriceValue]) => {
        if (!filterPriceValue.priceFrom && !filterPriceValue.priceTo) {
          return products;
        }
        return products.filter((product) =>
          filterPriceValue
            ? product.price >= +filterPriceValue.priceFrom &&
              product.price <= +filterPriceValue.priceTo
            : true
        );
      })
    );

  readonly products$: Observable<ProductsWithRatingQueryModel[]> =
    combineLatest([this.filteredProducts$, this.queryParamsValue$]).pipe(
      map(([products, queryParamsValues]) => {
        if (
          products.length <= queryParamsValues.limit &&
          queryParamsValues.pagination > 1
        ) {
          return products;
        }
        return products.slice(
          (queryParamsValues.pagination - 1) * queryParamsValues.limit,
          queryParamsValues.limit * queryParamsValues.pagination
        );
      })
    );

  private _ratingArrMap(array: number[]): number {
    return array.reduce((acc, curr) => acc + curr, 0);
  }
  constructor(
    private _categoryService: CategoryService,
    private _storeService: StoreService,
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _sortingValuesService: SortingValuesService,
    private _queryParamsService: QueryParamsService,
    private _filterValuesService: FilterValuesService
  ) {}
}
