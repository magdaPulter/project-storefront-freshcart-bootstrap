import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { ProductQueryModel } from 'src/app/query-models/product.query-model';
import { StoreQueryModel } from 'src/app/query-models/store.query-model';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly categories$: Observable<CategoryModel[]> =
    this._categoryService.getAll();

  readonly stores$: Observable<StoreQueryModel[]> = combineLatest([
    this._storeService.getAll(),
    this._storeService.getStoreTags(),
  ]).pipe(
    map(([stores, tags]) => {
      const tagMap = tags.reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr.name };
      }, {} as Record<string, string>);
      return stores.map((store) => {
        return {
          name: store.name,
          id: store.id,
          distanceInMeters: store.distanceInMeters,
          logoUrl: store.logoUrl,
          tagNames: store.tagIds.map((tIds) => tagMap[tIds]),
        };
      });
    })
  );

  readonly products$: Observable<ProductQueryModel[]> = combineLatest([
    this._productService.getAll(),
    this.categories$,
  ]).pipe(
    map(([products, categories]) => {
      const categoryMap = categories.reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr };
      }, {} as Record<string, CategoryModel>);
      return products.map((prod) => {
        return {
          name: prod.name,
          price: prod.price,
          featureValue: prod.featureValue,
          imageUrl: prod.imageUrl,
          categoryName: categoryMap[prod.categoryId].name,
        };
      });
    })
  );
  readonly fruitsVegetables$: Observable<ProductQueryModel[]> =
    this.products$.pipe(
      map((products) => {
        return products
          .filter((prod) => prod.categoryName === 'Fruits & Vegetables')
          .slice(0, 5)
          .sort((a, b) => (a.featureValue < b.featureValue ? 1 : -1));
      })
    );
  readonly snackMunchies$: Observable<ProductQueryModel[]> =
    this.products$.pipe(
      map((products) => {
        return products
          .filter((prod) => prod.categoryName === 'Snack & Munchies')
          .slice(0, 5)
          .sort((a, b) => (a.featureValue < b.featureValue ? 1 : -1));
      })
    );

  constructor(
    private _categoryService: CategoryService,
    private _storeService: StoreService,
    private _productService: ProductService
  ) {}
}
