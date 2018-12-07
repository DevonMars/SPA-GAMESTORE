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

const routes: Routes = [

  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: GamesComponent,
  children: [
    { path: '', component: GamesListComponent },
    { path: 'create', component: GamesCreateComponent },
    { path: ':gameId/edit', component: GamesCreateComponent}
  ]},
  { path: 'accessories', component: AccessoriesComponent,
  children: [
    { path: '', component: AccessoriesListComponent },
    { path: 'create', component: AccessoriesCreateComponent },
    { path: ':accessoryId', component: AccessoriesDetailsComponent},
    { path: ':accessoryId/edit', component: AccessoriesCreateComponent}
  ]},
  { path: 'stores', component: StoresComponent,
  children: [
    { path: '', component: StoresListComponent },
    { path: 'create', component: StoresCreateComponent },
    { path: ':storeId', component: StoresDetailsComponent},
    { path: ':storeId/edit', component: StoresCreateComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
