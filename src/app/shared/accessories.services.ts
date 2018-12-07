import {Accessory} from '../models/accessory.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AccessoriesService {
  private accessories: Accessory[] = [];
  accessoriesUpdated = new Subject<Accessory[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getAccessories() {
    this.http
      .get<{ message: string; accessories: any }>(
        'http://localhost:3000/api/accessories'
      )
      .pipe(map((accessoryData) => {
        return accessoryData.accessories.map(accessory => {
          return {
            title: accessory.title,
            discription: accessory.discription,
            id: accessory._id
          };
        });
      }))
      .subscribe(transformedAccessories => {
        this.accessories = transformedAccessories;
        this.accessoriesUpdated.next([...this.accessories]);
      });
  }

  getAccessoryUpdateListener() {
    return this.accessoriesUpdated.asObservable();
  }

  getAccessory(id: string) {
    return this.http.get<{  _id: string; title: string; discription: string }>(
      'http://localhost:3000/api/accessories/' + id
    );
  }

  addAccessory(title: string, discription: string) {
    const accessory: Accessory = {id: null, title: title, discription: discription };
    this.http.post<{message: string, accessoryId: string}>('http://localhost:3000/api/accessories', accessory)
    .subscribe((responseData) => {
      const accessoryId = responseData.accessoryId;
      accessory.id = accessoryId;
      this.accessories.push(accessory);
      this.accessoriesUpdated.next([...this.accessories]);
      this.router.navigate(['/']);
    });
  }

  updateAccessory(id: string, title: string, discription: string) {
    const accessory: Accessory = { id: id, title: title, discription: discription};
    this.http.put('http://localhost:3000/api/accessories/' + id, accessory)
    .subscribe(response => {
      const updatedAccessories = [...this.accessories];
      const oldAccessory =  updatedAccessories.findIndex(g => g.id === accessory.id);
      updatedAccessories[oldAccessory] = accessory;
      this.accessories = updatedAccessories;
      this.accessoriesUpdated.next([...this.accessories]);
      this.router.navigate(['/']);
    });
  }

  deleteAccessory(accessoryId: string) {
    this.http.delete('http://localhost:3000/api/accessories/' + accessoryId)
      .subscribe(() => {
        console.log('Accessory Deleted!');
        const updatedAccessories = this.accessories.filter( accessory => accessory.id !== accessoryId);
        this.accessories = updatedAccessories;
        this.accessoriesUpdated.next([...this.accessories]);
      });
  }

 }
