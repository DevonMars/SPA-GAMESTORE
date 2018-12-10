import {Store} from '../models/store.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Game } from '../models/game.model';
import { Accessory } from '../models/accessory.model';


@Injectable({providedIn: 'root'})
export class StoresService {
  stores: Store[] = [];
  storesUpdated = new Subject<{stores: Store[], storeCount: number}>();
  game: Game;
  accessory: Accessory;

  constructor(private http: HttpClient, private router: Router) {}

  getStores(storesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${storesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; stores: any, maxStores: number }>(
        'http://localhost:3000/api/stores' + queryParams
      )
      .pipe(map((storeData) => {
        return {stores: storeData.stores.map(store => {
          return {
            title: store.title,
            discription: store.discription,
            id: store._id,
            games: store.games,
            accessories: store.accessories
          };
        }), maxStores: storeData.maxStores};
      }))
      .subscribe(transformedStoresData => {
        this.stores = transformedStoresData.stores;
        this.storesUpdated.next({stores: [...this.stores], storeCount: transformedStoresData.maxStores});
      });
  }

  getStoreUpdateListener() {
    return this.storesUpdated.asObservable();
  }

  getStore(id: string) {
    return this.http.get<{_id: string; title: string; address: string; games: Game[]; accessories: Accessory[] }>(
      'http://localhost:3000/api/stores/' + id
    );
  }

  addStore(title: string, address: string, games: Game[], accessories: Accessory[] ) {
    const store: Store = { id: null, title: title, address: address,  games: games, accessories: accessories};
    this.http.post<{message: string, storeId: string}>('http://localhost:3000/api/stores', store)
    .subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }

  updateStore(id: string, title: string, address: string, games: Game[], accessories: Accessory[] ) {
    const store: Store = { id: id, title: title, address: address, games: games, accessories: accessories };
    this.http.put('http://localhost:3000/api/stores/' + id, store)
    .subscribe(response => {
      this.router.navigate(['/']);
    });
  }

  deleteStore(storeId: string) {
    return this.http.delete('http://localhost:3000/api/stores/' + storeId);
  }
}
