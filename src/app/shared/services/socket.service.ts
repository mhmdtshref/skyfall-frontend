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

  emitStartGame = (code: string) => {
    return new Promise((resolve, reject) => {
      let success = false;
      SocketService.socket.emit('startGame', { code });
      SocketService.socket.on('gameUpdated', (data) => {
        success = true;
        resolve(data);
      });
      setTimeout(() => {
        if (!success) {
          reject('Unable to create game');
        }
      }, 8000);
    });
  }

  emitLeaveGame = (code: string, playerId: number) => {
    return new Promise((resolve, reject) => {
      let success = false;
      SocketService.socket.emit('leaveGame', { code, playerId });
      SocketService.socket.on('leftGame', () => {
        success = true;
        resolve();
      });
      setTimeout(() => {
        if (!success) {
          reject('Unable to leave game');
        }
      }, 8000);
    });
  }

  emitEndGame = (code: string) => {
    return new Promise((resolve, reject) => {
      let success = false;
      SocketService.socket.emit('endGame', { code });
      SocketService.socket.on('gameEnded', () => {
        success = true;
        resolve();
      });
      setTimeout(() => {
        if (!success) {
          reject('Unable to end game');
        }
      }, 8000);
    });
  }

  emitRestartGame = (code: string) => {
    return new Promise((resolve, reject) => {
      let success = false;
      SocketService.socket.emit('restartGame', { code });
      SocketService.socket.on('gameUpdated', () => {
        success = true;
        resolve();
      });
      setTimeout(() => {
        if (!success) {
          reject('Unable to restart game');
        }
      }, 8000);
    });
  }

}
