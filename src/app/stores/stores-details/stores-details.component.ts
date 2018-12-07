import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/shared/stores.services';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { GamesService } from 'src/app/shared/games.services';

@Component({
  selector: 'app-stores-details',
  templateUrl: './stores-details.component.html',
  styleUrls: ['./stores-details.component.css']
})
export class StoresDetailsComponent implements OnInit {
  store: Store;
  storeId: string;
  gameId: string;
  isCollapsed: true;
  isLoading = false;

  constructor(public storesService: StoresService, public gamesService: GamesService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.storeId = paramMap.get('storeId');
      this.isLoading = true;
      this.storesService.getStore(this.storeId).subscribe(storeData => {
        this.isLoading = false;
        this.store = {
          id: storeData._id,
          title: storeData.title,
          address: storeData.address,
          games: storeData.games,
          accessories: storeData.accessories
        };
      });
    });
  }
}
