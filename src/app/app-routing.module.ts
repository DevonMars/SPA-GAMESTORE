import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent} from './games/games.component';
import {GamesListComponent} from './games/games-list/games-list.component';
import { GamesCreateComponent } from './games/games-create/games-create.component';
import { StoresComponent } from './stores/stores.component';
import { StoresListComponent } from './stores/stores-list/stores-list.component';
import { StoresCreateComponent } from './stores/stores-create/stores-create.component';
import { StoresDetailsComponent } from './stores/stores-details/stores-details.component';

const routes: Routes = [

  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: GamesComponent,
  children: [
    { path: '', component: GamesListComponent },
    { path: 'create', component: GamesCreateComponent },
    { path: ':gameId/edit', component: GamesCreateComponent},
  ]},
  { path: 'stores', component: StoresComponent,
  children: [
    { path: '', component: StoresListComponent },
    { path: 'create', component: StoresCreateComponent },
    { path: ':storeId', component: StoresDetailsComponent},
    { path: ':storeId/edit', component: StoresCreateComponent},
  ]}
  // { path: 'edit/:gameId', component: GamesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
