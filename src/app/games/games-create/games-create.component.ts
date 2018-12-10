import { Component, Output, OnInit} from '@angular/core';
import { GamesService } from '../../shared/games.services';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { mimeType } from 'src/app/shared/mime-type.validator';

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
  gameForm: FormGroup;
  imagePreview: string;

  constructor(public gamesService: GamesService,
    public router: Router, public route: ActivatedRoute) {}

    ngOnInit() {
      this.gameForm = new FormGroup({
        'title': new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        'discription': new FormControl(null, {
          validators: [Validators.required]
        }),
        'image': new FormControl(null, {
          validators: [Validators.required], asyncValidators: [mimeType]
        }),
      });
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('gameId')) {
          this.mode = 'edit';
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
            this.gameForm.setValue({
              'title': this.game.title,
              'discription': this.game.discription,
              'image': this.game.imagePath
            });
          });
        } else {
          this.mode = 'create';
          this.gameId = null;
        }
      });
    }

    onImagedPicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.gameForm.patchValue({image: file});
      this.gameForm.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      console.log(file);
      console.log(this.gameForm);
    }

    onSaveGame() {
      if (this.gameForm.invalid) {
        return;
      }
      this.isLoading = true;
      if (this.mode === 'create') {
        this.gamesService.addGame(
          this.gameForm.value.title,
          this.gameForm.value.discription,
          this.gameForm.value.image);
      } else {
        this.gamesService.updateGame(
          this.gameId,
          this.gameForm.value.title,
          this.gameForm.value.discription,
          this.gameForm.value.image
        );
      }
      this.gameForm.reset();
    }
  }
