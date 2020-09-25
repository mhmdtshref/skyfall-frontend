import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private socketService: SocketService
    ) { }

  createGame = (playerName) => {
    return this.socketService.emitCreateGame(playerName);
  }
}
