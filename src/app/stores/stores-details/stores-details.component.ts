import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/shared/stores.services';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from 'src/app/models/store.model';

@Component({
  selector: 'app-stores-details',
  templateUrl: './stores-details.component.html',
  styleUrls: ['./stores-details.component.css']
})
export class StoresDetailsComponent implements OnInit {
  store: Store;
  storeId: string;

  constructor(public storesService: StoresService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.storesService.getStore(this.storeId).subscribe(gameData => {
            this.store = {id: gameData._id, title: gameData.title, address: gameData.address, games: gameData.games};
            console.log(this.store.id);
          });
        }
      );
    }
}
