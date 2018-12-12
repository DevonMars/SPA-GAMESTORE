import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';


@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.
    post(BACKEND_URL + '/signup', authData)
    .subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>( BACKEND_URL + '/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const experationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, experationDate);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      } );
    }

    logoutUser() {
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.router.navigate(['/']);
    }

    autoAuthUser() {
      const authInformation = this.getAuthData();
      if (!authInformation) {
        return;
      }
      const now = new Date();
      const expiresIn = authInformation.experationDate.getTime() - now.getTime();
      if ( expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
      }
    }

    private setAuthTimer(duration: number) {
      this.tokenTimer = setTimeout(() =>  {
        this.logoutUser();
      }, duration * 1000 );
    }

    private saveAuthData(token: string, experationDate: Date) {
      localStorage.setItem('token', token);
      localStorage.setItem('experation', experationDate.toISOString());
    }

    private clearAuthData() {
      localStorage.removeItem('token');
      localStorage.removeItem('experation');
    }

    private getAuthData() {
      const token = localStorage.getItem('token');
      const experationDate = localStorage.getItem('experation');
      if (!token || !experationDate) {
        return;
      }
      return {
        token: token,
        experationDate: new Date(experationDate)
      };

    }
 }
