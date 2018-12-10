import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Accessory } from 'src/app/models/accessory.model';
import { AccessoriesService } from 'src/app/shared/accessories.services';
import { mimeType } from 'src/app/shared/mime-type.validator';

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
  accessorForm: FormGroup;
  imagePreview: string;

  constructor(public accessoriesService: AccessoriesService,
    public router: Router, public route: ActivatedRoute) {}

  ngOnInit() {
    this.accessorForm = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'discription': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required], asyncValidators: [mimeType]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('accessoryId')) {
        this.mode = 'edit';
        this.accessoryId = paramMap.get('accessoryId');
        this.isLoading = true;
        this.accessoriesService.getAccessory(this.accessoryId).subscribe(accessoryData => {
          this.isLoading = false;
          this.accessory = {
            id: accessoryData._id,
            title: accessoryData.title,
            discription: accessoryData.discription,
            imagePath: accessoryData.imagePath
          };
          this.accessorForm.setValue({
            'title': this.accessory.title,
            'discription': this.accessory.discription,
            'image': this.accessory.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.accessoryId = null;
      }
    });
  }

  onImagedPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.accessorForm.patchValue({image: file});
    this.accessorForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(file);
    console.log(this.accessorForm);
  }

  onSaveAccessory() {
    if (this.accessorForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.accessoriesService.addAccessory(
        this.accessorForm.value.title,
        this.accessorForm.value.discription,
        this.accessorForm.value.image
        );
    } else {
      this.accessoriesService.updateAccessory(
        this.accessoryId,
        this.accessorForm.value.title,
        this.accessorForm.value.discription,
        this.accessorForm.value.image
      );
    }
    this.accessorForm.reset();
  }

}
