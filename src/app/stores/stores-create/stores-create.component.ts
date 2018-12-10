import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm, FormGroup, Validators} from '@angular/forms';
import { StoresService } from 'src/app/shared/stores.services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { GamesService } from 'src/app/shared/games.services';
import { Game } from 'src/app/models/game.model';
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
  storeForm: FormGroup;
  totalCount;
  contentPerPage;
  currentPage;
  constructor(public storesService: StoresService, public gamesService: GamesService, public accessoriesService: AccessoriesService,
    public router: Router, public route: ActivatedRoute) {}

    ngOnInit() {
      this.storeForm = new FormGroup({
        'title': new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        'address': new FormControl(null, {
          validators: [Validators.required]
        }),
        'games': new FormControl(null, {
          validators: [Validators.required]
        }),
        'accessories': new FormControl(null, {
          validators: [Validators.required]
        }),
      });
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('storeId')) {
          this.mode = 'edit';
          this.storeId = paramMap.get('storeId');
          this.isLoading = true;
          this.storesService.getStore(this.storeId).subscribe(gameData => {
            this.isLoading = false;
            this.store = {
              id: gameData._id,
              title: gameData.title,
              address: gameData.address,
              games: gameData.games,
              accessories: gameData.accessories
            };
            this.storeForm.setValue({
              'title': this.store.title,
              'address': this.store.address,
              'games': this.store.games,
              'accessories': this.store.accessories
            });
            console.log(this.store);
          });
        } else {
          this.mode = 'create';
          this.storeId = null;
        }
        this.gamesService.getGames(this.contentPerPage, this.currentPage);
        this.gamesService.gamesUpdated.subscribe((gameData: {games: Game[], gameCount: number}) => {
          this.totalCount = gameData.gameCount;
          this.games = gameData.games; });
        this.accessoriesService.getAccessories(this.contentPerPage, this.currentPage);
        this.accessoriesService.accessoriesUpdated.subscribe((accessData: {accessories: Accessory[], accessCount: number}) => {
          this.totalCount = accessData.accessCount;
          this.accessories = accessData.accessories; });
      });
  }


  onSetSelectedGames() {
    this.selectedGames = this.games.filter(o1 => this.store.games.some(o2 => o1.id === o2.id));
  }
  onSetSelectedAccessories() {
    this.selectedAccessories = this.accessories.filter(o1 => this.store.accessories.some(o2 => o1.id === o2.id));
  }

  onSaveStore() {
    if (this.storeForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.storesService.addStore(
        this.storeForm.value.title,
        this.storeForm.value.address,
        this.storeForm.value.games,
        this.storeForm.value.accessories );
    } else {
      this.storesService.updateStore(
        this.storeId,
        this.storeForm.value.title,
        this.storeForm.value.address,
        this.storeForm.value.games,
        this.storeForm.value.accessories
      );
    }
    this.storeForm.reset();
  }
    // onSaveStore(form: NgForm) {
    //   if (form.invalid) {
    //     return;
    //   }
    //   this.isLoading = true;
    //   if (this.mode === 'create') {
    //     this.storesService.addStore(form.value.title, form.value.address, form.value.games, form.value.accessories );
    //   } else {
    //     this.storesService.updateStore(
    //       this.storeId,
    //       form.value.title,
    //       form.value.address,
    //       form.value.games,
    //       form.value.accessories
    //     );
    //   }
    //   form.resetForm();
    // }


  }

