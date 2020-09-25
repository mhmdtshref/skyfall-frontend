import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { E_GAME_STATUS, T_GAME_STATUS, T_GAME_STATUS_LABEL, E_GAME_STATUS_LABEL } from './game.constants';

@Component({
  selector: 'spyfall-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameStatusEnum = E_GAME_STATUS;

  isAdmin: boolean = false;
  gameStatus: T_GAME_STATUS = E_GAME_STATUS.started;

  gameStatusLabel: T_GAME_STATUS_LABEL = E_GAME_STATUS_LABEL.waiting;

  adminButtonText: string = 'Start';
  gameCode: string = 'XY4B';
  linkControl: FormControl = new FormControl('https://spyfall.com/game/XY4B');

  players = [{ name: 'Ahmad' }, { name: 'Murad' }, { name: 'Taher' }];
  playersColumnsData = [{ name: 'name', label: 'Name' }];

  leaveButtonText: string = 'End';

  location: string = 'Space X';

  constructor() { }

  adminButtonAction: Function = () => {
    console.log('ADMIN BUTTON ACTION FIRED!');
  }

  leaveButtonAction: Function = () => {
    console.log('LEAVE BUTTON ACTION FIRED!');
  }

  setUserDetails: Function = (isAdmin: boolean) => {
    if(isAdmin) {
      this.setUserAsAdmin();
    } else {
      this.setUserAsPlayer();
    }
  }

  setUserAsAdmin: Function = () => {
    this.isAdmin = true;
    this.setAdminButtonsText(this.gameStatus);
  }

  setUserAsPlayer: Function = () => {
    this.isAdmin = false;
    this.setPlayerButtonsText(this.gameStatus);
    this.setPlayerHeaderTexts(this.gameStatus);
  }

  setAdminButtonsText: Function = (status: T_GAME_STATUS) => {
    if(status === E_GAME_STATUS.started) {
      this.adminButtonText = 'Restart';
    } else {
      this.gameStatus = E_GAME_STATUS.waiting;
      this.adminButtonText = 'Start';
    }
    this.leaveButtonText = 'End';
  }

  setPlayerButtonsText: Function = (status: T_GAME_STATUS) => {
    if(status === E_GAME_STATUS.waiting) {
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

  ngOnInit(): void {
    this.setUserDetails(this.isAdmin);
  }

}
