import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccessoriesService } from 'src/app/shared/accessories.services';
import { Accessory } from '../../models/accessory.model';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accessories-list',
  templateUrl: './accessories-list.component.html',
  styleUrls: ['./accessories-list.component.css']
})
export class AccessoriesListComponent implements OnInit, OnDestroy {
  accessories: Accessory[] = [];
  isLoading = false;
  private accessoriesSub: Subscription;

  constructor(public accessoriesService: AccessoriesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.accessoriesService.getAccessories();
    this.accessoriesSub = this.accessoriesService.getAccessoryUpdateListener()
      .subscribe((accessories: Accessory[]) => {
        this.isLoading = false;
        this.accessories = accessories;
      });
  }

  onAddAccessory() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onDelete(gameId: string) {
    this.accessoriesService.deleteAccessory(gameId);
  }

  ngOnDestroy() {
    this.accessoriesSub.unsubscribe();
  }


}
