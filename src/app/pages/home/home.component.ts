import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog as MatDialogService } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/popup/popup.component';
import { DialogData } from 'src/app/interfaces';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'spyfall-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  joinCodeControl: FormControl = new FormControl();

  constructor(
    private dialogService: MatDialogService,
    // private translateService: TranslateService,
    ) {
      // this.translateService.use()
    }

  ngOnInit(): void {
  }

  createGame = (adminName: string) => {
    console.log('admin name is: ', adminName);
  }

  onCreateGameClick = () => {
    const data: DialogData = {
      title: 'Create Game',
      text: 'What is your name?',
      buttons: {
        confirm: {
          type: 'primary',
          text: 'Create',
          clickAction: this.createGame,
        },
        reject: {
          type: 'basic',
          text: 'Back',
        },
      },
      input: {
        type: 'text',
        label: 'Youe name',
        placeholder: 'Type here..',
      }
    };
    this.dialogService.open(PopupComponent, { data, width: '80%' });
  }

  onJoinClicked = () => {
    console.log('On Join Clicked');
  }


}
