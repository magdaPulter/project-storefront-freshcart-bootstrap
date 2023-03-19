import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreModel } from '../models/store.model';
import { TagModel } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class StoreService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<StoreModel[]> {
    return this._httpClient.get<StoreModel[]>('https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores');
  }

  getOne(storeId: string): Observable<StoreModel> {
    return this._httpClient.get<StoreModel>(`https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores/${storeId}`);
  }

  getStoreTags(): Observable<TagModel[]> {
    return this._httpClient.get<TagModel[]>('https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-store-tags');
  }

}
