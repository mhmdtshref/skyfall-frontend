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

  joinByCode = (code: string, playerName: string) => {
    return this.socketService.emitJoinGame(code, playerName);
  }

  startGame = (code: string) => {
    return this.socketService.emitStartGame(code);
  }

  leaveGame = (code: string, playerId: number) => {
    return this.socketService.emitLeaveGame(code, playerId);
  }

  endGame = (code: string) => {
    return this.socketService.emitEndGame(code);
  }

  restartGame = (code: string) => {
    return this.socketService.emitRestartGame(code);
  }
}
