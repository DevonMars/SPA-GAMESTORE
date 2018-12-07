import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Accessory } from 'src/app/models/accessory.model';
import { AccessoriesService } from 'src/app/shared/accessories.services';

@Component({
  selector: 'app-accessories-create',
  templateUrl: './accessories-create.component.html',
  styleUrls: ['./accessories-create.component.css']
})
export class AccessoriesCreateComponent implements OnInit {
  private mode = 'create';
  private accessoryId: string;
  accessory: Accessory;
  isLoading = false;

  constructor(public accessoriesService: AccessoriesService,
    public router: Router, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('accessoryId')) {
        this.mode = 'edit';
        this.accessoryId = paramMap.get('accessoryId');
        this.isLoading = true;
        this.accessoriesService.getAccessory(this.accessoryId).subscribe(accessoryData => {
          this.isLoading = false;
          this.accessory = {id: accessoryData._id, title: accessoryData.title, discription: accessoryData.discription};
        });
      } else {
        this.mode = 'create';
        this.accessoryId = null;
      }
    });
  }

  onSaveAccessory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.accessoriesService.addAccessory(form.value.title, form.value.discription);
    } else {
      this.accessoriesService.updateAccessory(
        this.accessoryId,
        form.value.title,
        form.value.discription
      );
    }
    form.resetForm();
  }

}
