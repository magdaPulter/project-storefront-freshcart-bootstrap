import { Injectable } from '@angular/core';
import { QueryParamsService } from './queryParams.service';
import { Observable, map, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterValuesService {
  constructor(private _queryParamsService: QueryParamsService) {}

  filterValuesCheckbox(): Observable<{ stores: Set<string> }> {
    return this._queryParamsService.getQueryParamsValues().pipe(
      map((queryParams) => ({
        stores: new Set<string>(
          queryParams.stores === undefined ? [] : queryParams.stores.split(',')
        ),
      }))
    );
  }

  refreshFilterByPrice(): Observable<{ priceFrom: string; priceTo: string }> {
    return this._queryParamsService.getQueryParams().pipe(
      map((queryParams) => {
        return {
          priceFrom: queryParams['priceFrom'],
          priceTo: queryParams['priceTo'],
        };
      })
    );
  }
}
