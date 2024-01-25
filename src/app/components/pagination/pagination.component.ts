import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { QueryParamsValueQueryModel } from '../../query-models/query-params-value.query-model';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  @Input() totalCount!: number;

  private _totalCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public totalCount$: Observable<number> =
    this._totalCountSubject.asObservable();

  constructor(
    private _router: Router,
    private _paginationService: PaginationService
  ) {}

  readonly limitButtons: number[] = [5, 10, 15];

  readonly queryParamsValue$: Observable<QueryParamsValueQueryModel> =
    this._paginationService.getQueryParamsValues();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalCount']) {
      this._totalCountSubject.next(changes['totalCount'].currentValue);
    }
  }

  readonly paginationButtons$: Observable<number[]> = combineLatest([
    this.queryParamsValue$,
    this.totalCount$,
  ]).pipe(
    map(([queryParams, totalCount]) => {
      return Array.from(
        Array(Math.ceil(totalCount / queryParams.limit)).keys()
      ).map((n) => n + 1);
    })
  );

  onLimitButtonClicked(limitButton: number) {
    this._router.navigate([], {
      queryParams: { limit: limitButton },
      queryParamsHandling: 'merge',
    });
  }

  onPaginationButtonClicked(paginationButton: number) {
    this._router.navigate([], {
      queryParams: { pagination: paginationButton },
      queryParamsHandling: 'merge',
    });
  }
}
