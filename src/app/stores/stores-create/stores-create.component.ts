import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import { StoresService } from 'src/app/shared/stores.services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { GamesService } from 'src/app/shared/games.services';
import { Game } from 'src/app/models/game.model';
import { Subscription } from 'rxjs';
import { Accessory } from 'src/app/models/accessory.model';
import { AccessoriesService } from 'src/app/shared/accessories.services';

@Component({
  selector: 'app-stores-create',
  templateUrl: './stores-create.component.html',
  styleUrls: ['./stores-create.component.css']
})
export class StoresCreateComponent implements OnInit {
  isLoading = false;
  private mode = 'create';
  selectedGames = [];
  selectedAccessories = [];
  storeId: string;
  games: Game[];
  accessories: Accessory[];
  store: Store;
  gamesSubscription: Subscription;
  formControlObj: FormControl;
  compareByValue = true;


  constructor(public storesService: StoresService, public gamesService: GamesService, public accessoriesService: AccessoriesService,
    public router: Router, public route: ActivatedRoute) {}

    ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('storeId')) {
          this.mode = 'edit';
          this.storeId = paramMap.get('storeId');
          this.isLoading = true;
          this.storesService.getStore(this.storeId).subscribe(gameData => {
            this.isLoading = false;
            this.store = {id: gameData._id, title: gameData.title, address: gameData.address,
              games: gameData.games, accessories: gameData.accessories};
            console.log(this.store);
          });
          console.log(this.store);
        } else {
          this.mode = 'create';
          this.storeId = null;
        }
        this.gamesService.getGames();
        this.gamesService.gamesUpdated.subscribe((games: Game[]) => { this.games = games; });
        this.accessoriesService.getAccessories();
        this.accessoriesService.accessoriesUpdated.subscribe((accessories: Accessory[]) => { this.accessories = accessories; });
      });
  }


  onSetSelectedGames() {
    this.selectedGames = this.games.filter(o1 => this.store.games.some(o2 => o1.id === o2.id));
  }
  onSetSelectedAccessories() {
    this.selectedAccessories = this.accessories.filter(o1 => this.store.accessories.some(o2 => o1.id === o2.id));
  }
    onSaveStore(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.isLoading = true;
      if (this.mode === 'create') {
        this.storesService.addStore(form.value.title, form.value.address, form.value.games, form.value.accessories );
      } else {
        this.storesService.updateStore(
          this.storeId,
          form.value.title,
          form.value.address,
          form.value.games,
          form.value.accessories
        );
      }
      form.resetForm();
    }


  }

