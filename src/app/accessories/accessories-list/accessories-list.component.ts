import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { AccessoriesService } from 'src/app/shared/accessories.services';
import { Accessory } from '../../models/accessory.model';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.services';

@Component({
  selector: 'app-accessories-list',
  templateUrl: './accessories-list.component.html',
  styleUrls: ['./accessories-list.component.css']
})
export class AccessoriesListComponent implements OnInit, OnDestroy {
  accessories: Accessory[] = [];
  isLoading = false;
  totalAccess = 0;
  accessPerPage = 5;
  currentPage = 1;
  userIsAuthenticated = false;
  pageSizeOptions = [1, 2, 5, 10];
  private accessoriesSub: Subscription;
  private authStatusSub: Subscription;

  // tslint:disable-next-line:max-line-length
  constructor(public accessoriesService: AccessoriesService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.accessoriesService.getAccessories(this.accessPerPage, this.currentPage);
    this.accessoriesSub = this.accessoriesService.getAccessoryUpdateListener()
      .subscribe((accessData: {accessories: Accessory[], accessCount: number}) => {
        this.isLoading = false;
        this.totalAccess = accessData.accessCount;
        this.accessories = accessData.accessories;
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
    this.accessPerPage = pageData.pageSize;
    this.accessoriesService.getAccessories(this.accessPerPage, this.currentPage);
  }

  onAddAccessory() {
    this.router.navigate(['create'], {relativeTo: this.route});
    this.authStatusSub.unsubscribe();
  }

  onDelete(accessId: string) {
    this.accessoriesService.deleteAccessory(accessId).subscribe(() => {
      this.accessoriesService.getAccessories(this.accessPerPage, this.currentPage);
    });
  }
  ngOnDestroy() {
    this.accessoriesSub.unsubscribe();
  }


}
