import { ChangeDetectionStrategy, Component, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ratingMap } from '../../methods/ratingMap'

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {
  @Output() rateHandle: EventEmitter<number[]>= new EventEmitter<number[]>()


  readonly ratingValue$: Observable<number[]> = of([5, 4, 3, 2])
  readonly ratingValueArray$: Observable<number[][]> = this.ratingValue$.pipe(
    map((rating => rating.map(rate => ratingMap(rate)))))

  radioChange(rate: number[]) {
    this.rateHandle.emit(rate)
  }
}
