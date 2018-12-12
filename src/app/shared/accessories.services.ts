import {Accessory} from '../models/accessory.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/accessories/';

@Injectable({providedIn: 'root'})
export class AccessoriesService {
  private accessories: Accessory[] = [];
  accessoriesUpdated = new Subject<{accessories: Accessory[], accessCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getAccessories(accessPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${accessPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; accessories: any, maxAccessories: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(map((accessoryData) => {
        return { accessories: accessoryData.accessories.map(accessory => {
          return {
            title: accessory.title,
            discription: accessory.discription,
            id: accessory._id,
            imagePath: accessory.imagePath
          };
        }), maxGames: accessoryData.maxAccessories};
      }))
      .subscribe(transformedAccessoriesData => {
        this.accessories = transformedAccessoriesData.accessories;
        this.accessoriesUpdated.next({accessories: [...this.accessories], accessCount: transformedAccessoriesData.maxGames});
      });
  }

  getAccessoryUpdateListener() {
    return this.accessoriesUpdated.asObservable();
  }

  getAccessory(id: string) {
    return this.http.get<{  _id: string; title: string; discription: string, imagePath: string }>(
      BACKEND_URL + id
    );
  }

  addAccessory(title: string, discription: string, image: File) {
    const accesData = new FormData();
    accesData.append('title', title);
    accesData.append('discription', discription);
    accesData.append('image', image, title);
    this.http.post<{message: string, accessory: Accessory}>( BACKEND_URL, accesData)
    .subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }

  updateAccessory(id: string, title: string, discription: string, image: File | string) {
    let accesData: Accessory | FormData;
    if (typeof(image) === 'object') {
      accesData = new FormData();
      accesData.append('id', id);
      accesData.append('title', title);
      accesData.append('discription', discription);
      accesData.append('image', image, title);
    } else {
      accesData = {
        id: id,
        title: title,
        discription: discription,
        imagePath: image
      };
    }
    this.http.put( BACKEND_URL + id, accesData)
    .subscribe(response => {
      this.router.navigate(['/']);
    });
  }

  deleteAccessory(accessoryId: string) {
    return this.http.delete( BACKEND_URL + accessoryId);
  }
 }
