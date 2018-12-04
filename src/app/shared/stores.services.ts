import {Store} from '../models/store.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Game } from '../models/game.model';


@Injectable({providedIn: 'root'})
export class StoresService {
  stores: Store[] = [];
  storesUpdated = new Subject<Store[]>();
  game: Game;

  constructor(private http: HttpClient, private router: Router) {}

  getStores() {
    this.http
      .get<{ message: string; stores: any }>(
        'http://localhost:3000/api/stores'
      )
      .pipe(map((storeData) => {
        return storeData.stores.map(store => {
          return {
            title: store.title,
            discription: store.discription,
            id: store._id,
            games: store.games
          };
        });
      }))
      .subscribe(transformedStores => {
        this.stores = transformedStores;
        this.storesUpdated.next([...this.stores]);
      });
  }

  getStoreUpdateListener() {
    return this.storesUpdated.asObservable();
  }

  getStore(id: string) {
    return this.http.get<{_id: string; title: string; address: string; games: Game[] }>(
      'http://localhost:3000/api/stores/' + id
    );
  }

  addStore(title: string, address: string, games: Game[]) {
    const store: Store = { id: null, title: title, address: address,  games: games};
    this.http.post<{message: string, storeId: string}>('http://localhost:3000/api/stores', store)
    .subscribe((responseData) => {
      const storeId = responseData.storeId;
      store.id = storeId;
      this.stores.push(store);
      this.storesUpdated.next([...this.stores]);
      this.router.navigate(['/']);
      console.log(responseData);
    });
  }

  updateStore(id: string, title: string, address: string, games: Game[]) {
    const store: Store = { id: id, title: title, address: address,  games: games};
    this.http.put('http://localhost:3000/api/stores/' + id, store)
    .subscribe(response => {
      const updatedStores = [...this.stores];
      const oldStore =  updatedStores.findIndex(g => g.id === store.id);
      updatedStores[oldStore] = store;
      this.stores = updatedStores;
      this.storesUpdated.next([...this.stores]);
      this.router.navigate(['/']);
    });
  }

  deleteStore(storeId: string) {
    this.http.delete('http://localhost:3000/api/stores/' + storeId)
      .subscribe(() => {
        console.log('Game Deleted!');
        const updatedStores = this.stores.filter( game => game.id !== storeId);
        this.stores = updatedStores;
        this.storesUpdated.next([...this.stores]);
      });
  }


}
