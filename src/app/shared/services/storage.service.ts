import { Injectable } from '@angular/core';
import { Game, Player } from '../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setGameToLocalStorage = (game: Game) => {
    window.localStorage.setItem('game', JSON.stringify(game));
  }

  setPlayerToLocalStorage = (player: Player) => {
    window.localStorage.setItem('player', JSON.stringify(player));
  }

  clearLocalStorage = () => {
    return new Promise(resolve => {
      window.localStorage.clear();
      resolve();
    });
  }

}
