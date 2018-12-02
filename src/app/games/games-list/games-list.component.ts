import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesService } from 'src/app/shared/games.services';
import { Game } from '../../models/game.model';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit, OnDestroy {

  games: Game[] = [];
  isLoading = false;
  private gamesSub: Subscription;

  constructor(public gamesService: GamesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.gamesService.getGames();
    this.gamesSub = this.gamesService.getGameUpdateListener()
      .subscribe((games: Game[]) => {
        this.isLoading = false;
        this.games = games;
      });
  }

  onAddGame() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onDelete(gameId: string) {
    this.gamesService.deleteGame(gameId);
  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
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
