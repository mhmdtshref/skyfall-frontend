import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { E_GAME_STATUS, T_GAME_STATUS, T_GAME_STATUS_LABEL, E_GAME_STATUS_LABEL } from './game.constants';
import { Game, Player } from '../../interfaces';
import { environment } from 'src/environments/environment';
import { GameService, SocketService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'spyfall-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameStatusEnum = E_GAME_STATUS;

  isAdmin = false;
  gameStatus: T_GAME_STATUS = E_GAME_STATUS.started;
  game: Game;
  player: Player;

  gameStatusLabel: T_GAME_STATUS_LABEL = E_GAME_STATUS_LABEL.waiting;

  adminButtonText = 'Start';
  gameCode = 'XY4B';
  linkControl: FormControl = new FormControl('https://spyfall.com/game/XY4B');

  players = [];
  playersColumnsData = [{ name: 'name', label: 'Name' }];

  leaveButtonText = 'End';

  location = 'Space X';

  constructor(
    private gameService: GameService,
    private router: Router,
  ) { }

  adminButtonAction = () => {
    switch(this.game.status) {
      case E_GAME_STATUS.waiting:
        this.gameService.startGame(this.game.code);
        break;
      case E_GAME_STATUS.started:
        this.gameService.restartGame(this.game.code);
    }
  }

  leaveButtonAction = () => {
    if(this.isAdmin) {
      this.gameService
      .endGame(this.game.code)
      .then(this.clearLocalStorage)
      .then(this.navigateToHome);
    } else {
      this.gameService
      .leaveGame(this.game.code, this.player.id)
      .then(this.clearLocalStorage)
      .then(this.navigateToHome);
    }
  }

  clearLocalStorage = () => {
    return new Promise(resolve => {
      window.localStorage.clear();
      resolve();
    });
  }

  navigateToHome = () => {
    this.router.navigate(['']);
  }

  setUserDetails = (isAdmin: boolean) => {
    if (isAdmin) {
      this.setUserAsAdmin();
    } else {
      this.setUserAsPlayer();
    }
  }

  setUserAsAdmin = () => {
    this.isAdmin = true;
    this.setAdminButtonsText(this.gameStatus);
  }

  setUserAsPlayer = () => {
    this.isAdmin = false;
    this.setPlayerButtonsText(this.gameStatus);
    this.setPlayerHeaderTexts(this.gameStatus);
  }

  setAdminButtonsText = (status: T_GAME_STATUS) => {
    if (status === E_GAME_STATUS.started) {
      this.adminButtonText = 'Restart';
    } else {
      this.gameStatus = E_GAME_STATUS.waiting;
      this.adminButtonText = 'Start';
    }
    this.leaveButtonText = 'End';
  }

  setPlayerButtonsText = (status: T_GAME_STATUS) => {
    if (status === E_GAME_STATUS.waiting) {
      this.leaveButtonText = 'Leave';
    } else {
      this.leaveButtonText = null;
    }
  }

  setPlayerHeaderTexts = (status: T_GAME_STATUS) => {
    if (status === E_GAME_STATUS.started) {
      this.gameStatusLabel = E_GAME_STATUS_LABEL.started;
    } else {
      this.gameStatus = E_GAME_STATUS.waiting;
      this.gameStatusLabel = E_GAME_STATUS_LABEL.waiting;
    }
  }

  setProps = () => {
    const game: Game = JSON.parse(window.localStorage.getItem('game')) as Game;
    const player: Player = JSON.parse(window.localStorage.getItem('player')) as Player;
    const { baseApiUrl } = environment;

    this.game = game;
    this.player = player;
    this.isAdmin = game.adminId === player.id;
    this.gameStatus = game.status;
    this.gameCode = game.code;

    this.linkControl.setValue(`${baseApiUrl}/join/${game.code}`);
  }

  setPlayers = () => {
    const { players } = this.game;
    const playersList = players.map(player => ({ name: player.name }));
    this.players = playersList;
  }

  setGameToLocalStorage = (game: Game) => {
    window.localStorage.setItem('game', JSON.stringify(game));
  }

  setPlayerToLocalStorage = (player: Player) => {
    window.localStorage.setItem('player', JSON.stringify(player));
  }

  setListeners = () => {
    SocketService.socket.on('playerJoined', (data: { game: Game }) => {
      const { game } = data;
      this.setGameToLocalStorage(game);
      this.setProps();
      this.setPlayers();
    });

    SocketService.socket.on('gameUpdated', (data: { game: Game }) => {
      const { game } = data;
      const player: Player = game.players.find(p => p.id === this.player.id) as Player;

      this.setGameToLocalStorage(game);
      this.setPlayerToLocalStorage(player);

      this.setProps();
      this.setUserDetails(this.isAdmin);
      this.setPlayers();
    });

    SocketService.socket.on('gameEnded', () => {
      this.clearLocalStorage()
      .then(this.navigateToHome);
    });
  }

  ngOnInit(): void {
    this.setProps();
    this.setUserDetails(this.isAdmin);
    this.setPlayers();
    this.setListeners();
  }

}
