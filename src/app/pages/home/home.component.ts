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

  constructor(private dialogService: MatDialogService) { }

  ngOnInit(): void {
  }

  createGame = (adminName: string) => {
    console.log('admin name is: ', adminName);
  }

  onCreateGameClick = () => {
    const data: DialogData = {
      title: 'Create Game',
      text: 'What is your name?',
      confirmButtonText: 'Create',
      rejectButtonText: 'Back',
      confirmAction: this.createGame,
    };
    this.dialogService.open(PopupComponent, { data });
  }

  onJoinClicked = () => {
    console.log('On Join Clicked');
  }


}
