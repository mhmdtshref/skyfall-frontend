import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { E_GAME_STATUS, T_GAME_STATUS, T_GAME_STATUS_LABEL, E_GAME_STATUS_LABEL } from './game.constants';
import { Game, GameLocation, Player } from '../../interfaces';
import { GameService, NavigationService, SocketService, StorageService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { BehaviorSubject } from 'rxjs';

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

  gameStatusLabel = 'pages.game.status.waiting';

  adminButtonText = 'pages.game.buttons.adminButton.start';
  gameCode = 'XY4B';
  linkControl: FormControl = new FormControl('https://spyfall.com/game/XY4B');

  players = [];
  playersColumnsData = [{ name: 'name', label: 'pages.game.table.headers.name' }];

  leaveButtonText = 'End';

  location: GameLocation;

  constructor(
    private gameService: GameService,
    private storageService: StorageService,
    private navigationService: NavigationService,
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
      .then(this.storageService.clearLocalStorage)
      .then(this.navigationService.navigateToHome);
    } else {
      this.gameService
      .leaveGame(this.game.code, this.player.id)
      .then(this.storageService.clearLocalStorage)
      .then(this.navigationService.navigateToHome);
    }
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
      this.adminButtonText = 'pages.game.buttons.adminButton.restart';
    } else {
      this.gameStatus = E_GAME_STATUS.waiting;
      this.adminButtonText = 'pages.game.buttons.adminButton.start';
    }
    this.leaveButtonText = 'pages.game.buttons.leaveButton.admin';
  }

  setPlayerButtonsText = (status: T_GAME_STATUS) => {
    if (status === E_GAME_STATUS.waiting) {
      this.leaveButtonText = 'pages.game.buttons.leaveButton.admin';
    } else {
      this.leaveButtonText = '';
    }
  }

  setPlayerHeaderTexts = (status: T_GAME_STATUS) => {
    if (status === E_GAME_STATUS.started) {
      this.gameStatusLabel = 'pages.game.status.started';
    } else {
      this.gameStatus = E_GAME_STATUS.waiting;
      this.gameStatusLabel = 'pages.game.status.waiting';
    }
  }

  setProps = () => {
    const game: Game = JSON.parse(window.localStorage.getItem('game')) as Game;
    const player: Player = JSON.parse(window.localStorage.getItem('player')) as Player;

    this.game = game;
    this.player = player;
    this.isAdmin = game.adminId === player.id;
    this.gameStatus = game.status;
    this.gameCode = game.code;
    this.location = this.game.location;

    this.linkControl.setValue(`${location.origin}/join/${game.code}`);
  }

  setPlayers = () => {
    const { players } = this.game;
    const playersList = players.map(player => ({ name: player.name }));
    this.players = playersList;
  }

  setListeners = () => {
    SocketService.socket.on('playerJoined', (data: { game: Game }) => {
      const { game } = data;
      this.storageService.setGameToLocalStorage(game);
      this.setProps();
      this.setPlayers();
    });

    SocketService.socket.on('gameUpdated', (data: { game: Game }) => {
      const { game } = data;
      const player: Player = game.players.find(p => p.id === this.player.id) as Player;

      this.storageService.setGameToLocalStorage(game);
      this.storageService.setPlayerToLocalStorage(player);

      this.setProps();
      this.setUserDetails(this.isAdmin);
      this.setPlayers();
    });

    SocketService.socket.on('gameEnded', () => {
      this.storageService.clearLocalStorage()
      .then(this.navigationService.navigateToHome);
    });
  }

  ngOnInit(): void {
    this.setProps();
    this.setUserDetails(this.isAdmin);
    this.setPlayers();
    this.setListeners();
  }

  get locationText() {
    return this.location[SharedService.language];
  }

}
