import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/shared/games.services';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-games-details',
  templateUrl: './games-details.component.html',
  styleUrls: ['./games-details.component.css']
})
export class GamesDetailsComponent implements OnInit {
  game: Game;
  gameId: string;
  isLoading = false;

  constructor(public gamesService: GamesService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.gameId = paramMap.get('gameId');
      this.isLoading = true;
      this.gamesService.getGame(this.gameId).subscribe(gameData => {
        this.isLoading = false;
        this.game = {
          id: gameData._id,
          title: gameData.title,
          discription: gameData.discription,
          imagePath: gameData.imagePath
        };
      });
    });
  }

}
