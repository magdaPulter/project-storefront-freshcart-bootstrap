import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { StoreQueryModel } from 'src/app/query-models/store.query-model';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoresComponent {
  @Input() stores!: StoreQueryModel[]
}
