import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, DialogButtons } from '../../interfaces';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'spyfall-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  title: string = 'Confirm';
  text: string = 'Are you sure?';
  buttons: DialogButtons = {
    confirm: {
      type: 'primary',
      text: 'Submit',
    },
    reject: {
      type: 'basic',
      text: 'Back',
    },
  };
  inputControl: FormControl = new FormControl();

  onConfirm = () => {
    if(this.data.buttons.confirm.clickAction instanceof Function) {
      this.data.buttons.confirm.clickAction(this.data.input ? this.inputControl.value : undefined);
    }
    this.dialogRef.close();
  }

  onReject = () => {
    if(this.data.buttons.reject.clickAction instanceof Function) {
      this.data.buttons.reject.clickAction();
    }
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
