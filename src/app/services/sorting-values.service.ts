import { Injectable } from '@angular/core';
import { SortingValueQueryModel } from '../query-models/sorting-value.query-model';

@Injectable({ providedIn: 'root' })
export class SortingValuesService {

    getSortingValues(): SortingValueQueryModel[] {
        return ([
            { title: 'Featured', property: 'desc-featureValue' },
            { title: 'Price Low to high', property: 'asc-price' },
            { title: 'Price High to Low', property: 'desc-price' },
            { title: 'Avg. Rating', property: 'desc-ratingValue' }
        ])
    }
}
