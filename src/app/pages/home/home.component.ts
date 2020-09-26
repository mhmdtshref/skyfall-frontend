import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog as MatDialogService } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/popup/popup.component';
import { DialogData, Game, Player } from 'src/app/interfaces';
import { GameService, SocketService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'spyfall-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  joinCodeControl: FormControl = new FormControl();

  constructor(
    private dialogService: MatDialogService,
    private gameService: GameService,
    private router: Router,
    ) {
    }

  ngOnInit(): void {
  }

  createGameSubmit = (adminName: string) => {
    this.gameService.createGame(adminName)
    .then((data: { game: Game, player: Player }) => {
      const { game, player } = data;
      this.setGameToLocalStorage(game);
      this.setPlayerToLocalStorage(player);
      this.navigateToGame();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onCreateGameClick = () => {
    const data: DialogData = {
      title: 'pages.home.createGamePopup.title',
      text: 'pages.home.createGamePopup.text',
      buttons: {
        confirm: {
          type: 'primary',
          text: 'pages.home.createGamePopup.confirm',
          clickAction: this.createGameSubmit,
        },
        reject: {
          type: 'basic',
          text: 'pages.home.createGamePopup.reject',
        },
      },
      input: {
        type: 'text',
        label: 'pages.home.createGamePopup.input.label',
        placeholder: 'pages.home.createGamePopup.input.placeholder',
      }
    };
    this.dialogService.open(PopupComponent, { data, width: '80%' });
  }

  onJoinClicked = () => {
    console.log('value: ', this.joinCodeControl.value);
    const data: DialogData = {
      title: 'pages.home.joinGamePopup.title',
      text: 'pages.home.joinGamePopup.text',
      buttons: {
        confirm: {
          type: 'primary',
          text: 'pages.home.joinGamePopup.confirm',
          clickAction: this.onJoinGameSubmit,
        },
        reject: {
          type: 'basic',
          text: 'pages.home.joinGamePopup.reject',
        },
      },
      input: {
        type: 'text',
        label: 'pages.home.joinGamePopup.input.label',
        placeholder: 'pages.home.joinGamePopup.input.placeholder',
      }
    };
    this.dialogService.open(PopupComponent, { data, width: '80%' });
  }

  onJoinGameSubmit = (playerName: string) => {
    const code = this.joinCodeControl.value;
    console.log('CODE: ', code, ' and control: ', this.joinCodeControl);
    this.gameService.joinByCode(code, playerName)
    .then((data: { game: Game, player: Player }) => {
      const { game, player } = data;
      this.setGameToLocalStorage(game);
      this.setPlayerToLocalStorage(player);
      this.navigateToGame();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  setGameToLocalStorage = (game: Game) => {
    window.localStorage.setItem('game', JSON.stringify(game));
  }

  setPlayerToLocalStorage = (player: Player) => {
    window.localStorage.setItem('player', JSON.stringify(player));
  }

  navigateToGame = () => {
    this.router.navigate(['game']);
  }

}
