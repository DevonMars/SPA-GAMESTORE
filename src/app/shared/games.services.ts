import {Game} from '../models/game.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class GamesService {
  private games: Game[] = [];
  gamesUpdated = new Subject<Game[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getGames() {
    this.http
      .get<{ message: string; games: any }>(
        'http://localhost:3000/api/games'
      )
      .pipe(map((gameData) => {
        return gameData.games.map(game => {
          return {
            title: game.title,
            discription: game.discription,
            id: game._id
          };
        });
      }))
      .subscribe(transformedGames => {
        this.games = transformedGames;
        this.gamesUpdated.next([...this.games]);
      });
  }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getGame(id: string) {
    return this.http.get<{  _id: string; title: string; discription: string }>(
      'http://localhost:3000/api/games/' + id
    );
  }

  addGame(title: string, discription: string) {
    const game: Game = {id: null, title: title, discription: discription };
    this.http.post<{message: string, gameId: string}>('http://localhost:3000/api/games', game)
    .subscribe((responseData) => {
      const gameId = responseData.gameId;
      game.id = gameId;
      this.games.push(game);
      this.gamesUpdated.next([...this.games]);
      this.router.navigate(['/']);
    });
  }

  updateGame(id: string, title: string, discription: string) {
    const game: Game = { id: id, title: title, discription: discription};
    this.http.put('http://localhost:3000/api/games/' + id, game)
    .subscribe(response => {
      const updatedGames = [...this.games];
      const oldGame =  updatedGames.findIndex(g => g.id === game.id);
      updatedGames[oldGame] = game;
      this.games = updatedGames;
      this.gamesUpdated.next([...this.games]);
      this.router.navigate(['/']);
    });
  }

  deleteGame(gameId: string) {
    this.http.delete('http://localhost:3000/api/games/' + gameId)
      .subscribe(() => {
        console.log('Game Deleted!');
        const updatedGames = this.games.filter( game => game.id !== gameId);
        this.games = updatedGames;
        this.gamesUpdated.next([...this.games]);
      });
  }
}
