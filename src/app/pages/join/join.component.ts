import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog as MatDialogService } from '@angular/material/dialog';
import { DialogData, Game, Player } from 'src/app/interfaces';
import { first } from 'rxjs/operators'
import { PopupComponent } from 'src/app/shared/popup/popup.component';
import { GameService } from 'src/app/shared/services';

@Component({
  selector: 'spyfall-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  code: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialogService: MatDialogService,
    private gameService: GameService,
    private router: Router,
  ) { }

  showJoinPopup = () => {
    const data: DialogData = {
      title: 'pages.join.joinGamePopup.title',
      text: 'pages.join.joinGamePopup.text',
      buttons: {
        confirm: {
          type: 'primary',
          text: 'pages.join.joinGamePopup.confirm',
          clickAction: this.onJoinGameSubmit,
        },
        reject: {
          type: 'basic',
          text: 'pages.join.joinGamePopup.reject',
          clickAction: this.navigateToHome,
        },
      },
      input: {
        type: 'text',
        label: 'pages.join.joinGamePopup.input.label',
        placeholder: 'pages.join.joinGamePopup.input.placeholder',
      }
    };
    this.dialogService.open(PopupComponent, { data, width: '80%' });
  }

  onJoinGameSubmit = (playerName: string) => {
    const code = this.code;
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

  navigateToHome = () => {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(first()).subscribe((params: { code: string }) => {
      this.code = params.code;
      this.showJoinPopup();
    });
  }

}
