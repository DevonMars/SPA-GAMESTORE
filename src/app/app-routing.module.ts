import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent} from './games/games.component';
import {GamesListComponent} from './games/games-list/games-list.component';
import { GamesCreateComponent } from './games/games-create/games-create.component';
import { StoresComponent } from './stores/stores.component';
import { StoresListComponent } from './stores/stores-list/stores-list.component';
import { StoresCreateComponent } from './stores/stores-create/stores-create.component';
import { StoresDetailsComponent } from './stores/stores-details/stores-details.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { AccessoriesDetailsComponent } from './accessories/accessories-details/accessories-details.component';
import { AccessoriesCreateComponent } from './accessories/accessories-create/accessories-create.component';
import { AccessoriesListComponent } from './accessories/accessories-list/accessories-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: GamesComponent,
  children: [
    { path: '', component: GamesListComponent },
    { path: 'create', component: GamesCreateComponent, canActivate: [AuthGuard] },
    { path: ':gameId/edit', component: GamesCreateComponent, canActivate: [AuthGuard] }
  ]},
  { path: 'accessories', component: AccessoriesComponent,
  children: [
    { path: '', component: AccessoriesListComponent },
    { path: 'create', component: AccessoriesCreateComponent, canActivate: [AuthGuard]  },
    { path: ':accessoryId', component: AccessoriesDetailsComponent},
    { path: ':accessoryId/edit', component: AccessoriesCreateComponent, canActivate: [AuthGuard] }
  ]},
  { path: 'stores', component: StoresComponent,
  children: [
    { path: '', component: StoresListComponent },
    { path: 'create', component: StoresCreateComponent },
    { path: ':storeId', component: StoresDetailsComponent},
    { path: ':storeId/edit', component: StoresCreateComponent},
  ]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
