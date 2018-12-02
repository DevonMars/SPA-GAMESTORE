import { Game } from './game.model';

export interface Store {
  id: string;
  title: string;
  address: string;
  games: Game[];
  // age: number;
  // publisher: string;
  // developer: string;
  // spokenLanguage: string;
  // subtitles: string;
  // imagePath: string;
}
