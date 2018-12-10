import {Game} from '../models/game.model';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class GamesService {
  private games: Game[] = [];
  gamesUpdated = new Subject<{games: Game[], gameCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getGames(gamesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${gamesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; games: any, maxGames: number }>(
        'http://localhost:3000/api/games' + queryParams
      )
      .pipe(map((gameData) => {
        return {games: gameData.games.map(game => {
          return {
            title: game.title,
            discription: game.discription,
            id: game._id,
            imagePath: game.imagePath
          };
        }), maxGames: gameData.maxGames};
      }))
      .subscribe(transformedGamesData => {
        this.games = transformedGamesData.games;
        this.gamesUpdated.next({games: [...this.games], gameCount: transformedGamesData.maxGames});
      });
  }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getGame(id: string) {
    return this.http.get<{  _id: string; title: string; discription: string, imagePath: string }>(
      'http://localhost:3000/api/games/' + id
    );
  }

  addGame(title: string, discription: string, image: File) {
    const gameData = new FormData();
    gameData.append('title', title);
    gameData.append('discription', discription);
    gameData.append('image', image, title);
    this.http.post<{message: string, game: Game}>('http://localhost:3000/api/games', gameData)
    .subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }

  updateGame(id: string, title: string, discription: string, image: File | string) {
    let gameData: Game | FormData;
    if (typeof(image) === 'object') {
      gameData = new FormData();
      gameData.append('id', id);
      gameData.append('title', title);
      gameData.append('discription', discription);
      gameData.append('image', image, title);
    } else {
      gameData = {
        id: id,
        title: title,
        discription: discription,
        imagePath: image
      };
    }
    this.http.put('http://localhost:3000/api/games/' + id, gameData)
    .subscribe(response => {
      this.router.navigate(['/']);
    });
  }

  deleteGame(gameId: string) {
    return this.http.delete('http://localhost:3000/api/games/' + gameId);
  }
}
