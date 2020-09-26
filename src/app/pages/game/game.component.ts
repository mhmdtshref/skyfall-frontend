import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { E_GAME_STATUS, T_GAME_STATUS, T_GAME_STATUS_LABEL, E_GAME_STATUS_LABEL } from './game.constants';
import { Game, Player } from '../../interfaces';
import { environment } from 'src/environments/environment';

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

  players = [{ name: 'Ahmad' }, { name: 'Murad' }, { name: 'Taher' }];
  playersColumnsData = [{ name: 'name', label: 'Name' }];

  leaveButtonText = 'End';

  location = 'Space X';

  constructor() { }

  adminButtonAction = () => {
    console.log('ADMIN BUTTON ACTION FIRED!');
  }

  leaveButtonAction = () => {
    console.log('LEAVE BUTTON ACTION FIRED!');
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

    this.linkControl.setValue(`${baseApiUrl}/game/join/${game.code}`);
  }

  setPlayers = () => {
    const { players } = this.game;
    const playersList = players.map(player => ({ name: player.name }));
    this.players = playersList;
  }

  ngOnInit(): void {
    this.setProps();
    this.setUserDetails(this.isAdmin);
    this.setPlayers();
  }

}
