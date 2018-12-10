import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatPaginatorModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { GamesComponent } from './games/games.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GamesCreateComponent } from './games/games-create/games-create.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { StoresComponent } from './stores/stores.component';
import { StoresListComponent } from './stores/stores-list/stores-list.component';
import { StoresDetailsComponent } from './stores/stores-details/stores-details.component';
import { StoresCreateComponent } from './stores/stores-create/stores-create.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { AccessoriesListComponent } from './accessories/accessories-list/accessories-list.component';
import { AccessoriesDetailsComponent } from './accessories/accessories-details/accessories-details.component';
import { AccessoriesCreateComponent } from './accessories/accessories-create/accessories-create.component';
import {SuiModule} from 'ng2-semantic-ui';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './shared/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesComponent,
    GamesListComponent,
    GamesCreateComponent,
    StoresComponent,
    StoresListComponent,
    StoresDetailsComponent,
    StoresCreateComponent,
    AccessoriesComponent,
    AccessoriesListComponent,
    AccessoriesDetailsComponent,
    AccessoriesCreateComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    SuiModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
