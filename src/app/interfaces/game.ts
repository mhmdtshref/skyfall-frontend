import { Player } from "./player";
import { T_GAME_STATUS } from '../pages/game/game.constants';
import { GameLocation } from './location';

export interface Game {
    id: number;
    players: Player[];
    location: GameLocation;
    status: T_GAME_STATUS;
    adminId: number;
    code: string;
}
