import { Component, Output, OnInit} from '@angular/core';
import { GamesService } from '../../shared/games.services';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-games-create',
  templateUrl: './games-create.component.html',
  styleUrls: ['./games-create.component.css']
})
export class GamesCreateComponent implements OnInit {

  gameTitle = '';
  gameDiscription = '';
  private mode = 'create';
  private gameId: string;
  game: Game;
  isLoading = false;

  constructor(public gamesService: GamesService,
    public router: Router, public route: ActivatedRoute) {}

    ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('gameId')) {
          this.mode = 'edit';
          this.gameId = paramMap.get('gameId');
          this.isLoading = true;
          this.gamesService.getGame(this.gameId).subscribe(gameData => {
            this.isLoading = false;
            this.game = {id: gameData._id, title: gameData.title, discription: gameData.discription};
          });
        } else {
          this.mode = 'create';
          this.gameId = null;
        }
      });
    }

    onSaveGame(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.isLoading = true;
      if (this.mode === 'create') {
        this.gamesService.addGame(form.value.title, form.value.discription);
      } else {
        this.gamesService.updateGame(
          this.gameId,
          form.value.title,
          form.value.discription
        );
      }
      form.resetForm();
    }
  }
