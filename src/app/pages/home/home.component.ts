import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog as MatDialogService } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/popup/popup.component';
import { DialogData } from 'src/app/interfaces';

@Component({
  selector: 'spyfall-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  joinCodeControl: FormControl = new FormControl();

  constructor(
    private dialogService: MatDialogService,
    ) {
    }

  ngOnInit(): void {
  }

  createGame = (adminName: string) => {
    console.log('admin name is: ', adminName);
  }

  onCreateGameClick = () => {
    const data: DialogData = {
      title: 'pages.home.createGamePopup.title',
      text: 'pages.home.createGamePopup.text',
      buttons: {
        confirm: {
          type: 'primary',
          // text: 'pages.home.createGamePopup.confirm',
          clickAction: this.createGame,
        },
        reject: {
          type: 'basic',
          // text: 'pages.home.createGamePopup.reject',
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
    console.log('On Join Clicked');
  }


}
