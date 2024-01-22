import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-filter-by-price',
  templateUrl: './filter-by-price.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByPriceComponent implements AfterViewInit {
  @Input() filterByPrice!: FormGroup;

  constructor(private _router: Router) {}

  ngAfterViewInit(): void {
    this.filterByPrice.valueChanges
      .pipe(
        tap((filterByPrice) => {
          if (filterByPrice) {
            this._router.navigate([], {
              queryParams: {
                priceFrom: filterByPrice.priceFrom,
                priceTo: filterByPrice.priceTo,
              },
              queryParamsHandling: 'merge',
            });
          }
        })
      )
      .subscribe();
  }
}
