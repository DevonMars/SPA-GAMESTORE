import { Game } from './game.model';
import { Accessory} from './accessory.model';

export interface Store {
  id: string;
  title: string;
  address: string;
  games: Game[];
  accessories: Accessory[];
  // age: number;
  // publisher: string;
  // developer: string;
  // spokenLanguage: string;
  // subtitles: string;
  // imagePath: string;
}
