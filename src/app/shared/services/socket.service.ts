import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  static socket;

  constructor() {}

  emitCreateGame = (playerName: string) => {
    return new Promise((resolve, reject) => {
      let success = false;
      SocketService.socket.emit('createGame', { playerName });
      SocketService.socket.on('gameCreated', (data) => {
        success = true;
        return resolve(data);
      });
      setTimeout(() => {
        if (!success) {
          reject('Unable to create game');
        }
      }, 8000);
    });
  }

  emitJoinGame = (gameCode: string, playerName: string) => {
    return new Promise((resolve, reject) => {
      let success = false;
      SocketService.socket.emit('joinGame', { gameCode, playerName });
      SocketService.socket.on('joinSuccess', (data) => {
        success = true;
        return resolve(data);
      });
      setTimeout(() => {
        if (!success) {
          reject('Unable to join game');
        }
      }, 8000);
    });
  }

}
