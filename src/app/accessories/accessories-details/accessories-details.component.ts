import { Component, OnInit } from '@angular/core';
import { Accessory } from 'src/app/models/accessory.model';
import { AccessoriesService } from 'src/app/shared/accessories.services';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-accessories-details',
  templateUrl: './accessories-details.component.html',
  styleUrls: ['./accessories-details.component.css']
})
export class AccessoriesDetailsComponent implements OnInit {
  accessory: Accessory;
  accessoryId: string;
  isLoading = false;

  constructor(public accessoriesService: AccessoriesService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.accessoryId = paramMap.get('accessoryId');
      this.isLoading = true;
      this.accessoriesService.getAccessory(this.accessoryId).subscribe(accessData => {
        this.isLoading = false;
        this.accessory = {
          id: accessData._id,
          title: accessData.title,
          discription: accessData.discription,
          imagePath: accessData.imagePath
        };
      });
    });
  }

}
