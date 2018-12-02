import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoresService } from 'src/app/shared/stores.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit, OnDestroy {
  stores: Store[] = [];
  isLoading = false;
  private storesSub: Subscription;

  constructor(public storesService: StoresService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.storesService.getStores();
    this.storesSub = this.storesService.getStoreUpdateListener()
      .subscribe((stores: Store[]) => {
        this.isLoading = false;
        this.stores = stores;
      });
  }

  onAddStore() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onDelete(storeId: string) {
    this.storesService.deleteStore(storeId);
  }


  ngOnDestroy() {
    this.storesSub.unsubscribe();
  }

}
