import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { StoreModel } from 'src/app/models/store.model';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreFormComponent implements AfterViewInit{
  @Input() storeForm!: FormGroup
  @Input() searchStore!: FormControl
  @Input() stores!: StoreModel[]

  constructor(private _router: Router){}

  ngAfterViewInit(): void {
    this.storeForm.valueChanges.pipe(
      map((filterValue) => Object.entries(filterValue)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)),
      tap((selectedValue) => {
        if (selectedValue.length > 0) {
          this._router.navigate(
            [],
            {
              queryParams: { stores: selectedValue.sort().join(',') }, queryParamsHandling: 'merge'
            }
          )
        }
      })
    ).subscribe()
  }

}
