import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../interfaces';

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
  rejectButtonText: string = 'No';
  confirmButtonText: string = 'Yes';

  onConfirm = () => {
    if(this.data.confirmAction instanceof Function) {
      this.data.confirmAction();
    }
    this.dialogRef.close();
  }

  onReject = () => {
    if(this.data.rejectAction instanceof Function) {
      this.data.rejectAction();
    }
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
