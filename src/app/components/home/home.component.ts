import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { StoreModel } from '../../models/store.model';
import { ProductModel } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { ProductQueryModel } from 'src/app/query-models/product.query-model';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll();
  readonly stores$: Observable<StoreModel[]> = this._storeService.getAll();
  readonly products$: Observable<ProductModel[]> = this._productService.getAll();

  readonly productsWithCategories$: Observable<ProductQueryModel[]> = combineLatest([
    this.products$,
    this.categories$
  ]).pipe(
    map(([products, categories]) => {
      const categoryMap = categories.reduce((acc, curr) => {
        return {...acc, [curr.id]: curr} 
      }, {} as Record<string, CategoryModel>)
      return products.map(prod => {
        return {
          name: prod.name,
          price: prod.price,
          featureValue: prod.featureValue,
          imageUrl: prod.imageUrl,
          categoryName: categoryMap[prod.categoryId].name
        }
      })
    })
  )
  readonly fruitsVegetables$: Observable<ProductQueryModel[]> = this.productsWithCategories$.pipe(
    map((products) => {
      return products
      .filter(prod => prod.categoryName === 'Fruits & Vegetables')
      .slice(0,5)
      .sort((a,b) => a.featureValue < b.featureValue ? 1 : -1)
    })
  )
    readonly snackMunchies$: Observable<ProductQueryModel[]> = this.productsWithCategories$.pipe(
    map((products) => {
      return products
      .filter(prod =>  prod.categoryName === 'Snack & Munchies')
      .slice(0,5)
      .sort((a,b) => a.featureValue < b.featureValue ? 1 : -1)
    })
  )

  constructor(private _categoryService: CategoryService, private _storeService: StoreService, private _productService: ProductService) {
    this.fruitsVegetables$.subscribe(value => console.log(value))
  }
}
