import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoresService } from 'src/app/shared/stores.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.services';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit, OnDestroy {
  stores: Store[] = [];
  isLoading = false;
  totalStores = 0;
  storesPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private storesSub: Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  // tslint:disable-next-line:max-line-length
  constructor(public storesService: StoresService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.storesService.getStores(this.storesPerPage, this.currentPage);
    this.storesSub = this.storesService.getStoreUpdateListener()
    .subscribe((storeData: {stores: Store[], storeCount: number}) => {
      this.isLoading = false;
      this.totalStores = storeData.storeCount;
      this.stores = storeData.stores;
    });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.storesPerPage = pageData.pageSize;
    this.storesService.getStores(this.storesPerPage, this.currentPage);
  }

  onAddStore() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onDelete(storeId: string) {
    this.storesService.deleteStore(storeId).subscribe(() => {
      this.storesService.getStores(this.storesPerPage, this.currentPage);
    });
  }


  ngOnDestroy() {
    this.storesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
