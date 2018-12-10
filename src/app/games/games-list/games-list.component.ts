import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { GamesService } from 'src/app/shared/games.services';
import { Game } from '../../models/game.model';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.services';


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit, OnDestroy {

  games: Game[] = [];
  isLoading = false;
  totalGames = 0;
  gamesPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  private gamesSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public gamesService: GamesService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.gamesService.getGames(this.gamesPerPage, this.currentPage);
    this.gamesSub = this.gamesService.getGameUpdateListener()
      .subscribe((gameData: {games: Game[], gameCount: number}) => {
        this.isLoading = false;
        this.totalGames = gameData.gameCount;
        this.games = gameData.games;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.gamesPerPage = pageData.pageSize;
    this.gamesService.getGames(this.gamesPerPage, this.currentPage);
  }

  onAddGame() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onDelete(gameId: string) {
    this.gamesService.deleteGame(gameId).subscribe(() => {
      this.gamesService.getGames(this.gamesPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }




//  posts = [
//     { title: 'First Post', content: 'This is the first post\'s content' },
//     { title: 'Second Post', content: 'This is the second post\'s content' },
//     { title: 'Third Post', content: 'This is the third post\'s content' },
//     { title: 'First Post', content: 'This is the first post\'s content' },
//     { title: 'Second Post', content: 'This is the second post\'s content' },
//     { title: 'Third Post', content: 'This is the third post\'s content' },
//     { title: 'First Post', content: 'This is the first post\'s content' },
//     { title: 'Second Post', content: 'This is the second post\'s content' },
//     { title: 'Third Post', content: 'This is the third post\'s content' },
//     { title: 'First Post', content: 'This is the first post\'s content' },
//     { title: 'Second Post', content: 'This is the second post\'s content' },
//     { title: 'Third Post', content: 'This is the third post\'s content' }
//   ];


//   pictures = [
//     {
//       id: 1,
//       title: 'A natural view',
//       img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg'
//     },
//     {
//       id: 2,
//       title: 'Newspaper',
//       img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/LTLE4QGRVQ.jpg'
//     },
//     {
//       id: 3,
//       title: 'Favourite pizza',
//       img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/R926LU1YEA.jpg'
//     },
//     {
//       id: 4,
//       title: 'Abstract design',
//       img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/U9PP3KXXY2.jpg'
//     },
//     {
//       id: 5,
//       title: 'Tech',
//       img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/NO9CN3QYR3.jpg'
//     },
//     {
//       id: 6,
//       title: 'Nightlife',
//       img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/X1UK6NLGRU.jpg'
//     },
//   ];

}
