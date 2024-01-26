import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { QueryParamsValueQueryModel } from '../query-models/query-params-value.query-model';

@Injectable({ providedIn: 'root' })
export class QueryParamsService {
  getQueryParams(): Observable<Params> {
    return this._activatedRoute.queryParams.pipe(shareReplay(1));
  }

  getQueryParamsValues(): Observable<QueryParamsValueQueryModel> {
    return this.getQueryParams().pipe(
      map((queryParams) => {
        return {
          limit: queryParams['limit'] ? +queryParams['limit'] : 5,
          pagination: queryParams['pagination']
            ? +queryParams['pagination']
            : 1,
          stores: queryParams['stores'],
        };
      }),
      shareReplay(1)
    );
  }

  constructor(private _activatedRoute: ActivatedRoute) {}
}
