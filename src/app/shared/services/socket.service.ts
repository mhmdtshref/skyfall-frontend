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

}
