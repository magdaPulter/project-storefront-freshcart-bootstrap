import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { QueryParamsValueQueryModel } from 'src/app/query-models/query-params-value.query-model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() queryParams!: QueryParamsValueQueryModel;
  @Input() paginationButtons!: number[];

  constructor(private _router: Router) {}

  readonly limitButtons: number[] = [5, 10, 15];

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
