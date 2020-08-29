import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTooltip } from '@angular/material/tooltip';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'spyfall-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {

  @Input()
  label: string = null;

  @Input()
  type: string = 'text';

  @Input()
  control: FormControl = new FormControl();

  @Input()
  placeholder: string = 'Enter';

  @Input()
  readonly: boolean = false;

  @Input()
  copyAbility: boolean = false;

  @ViewChild('copyIcon')
  copyIcon: MatTooltip;

  timerSubscriber: Subscription;

  constructor(private clipboard: Clipboard) { }
  

  copyToClipboard = () => {
    this.clipboard.copy(this.control.value);
    this.copyIcon.show();
    this.timerSubscriber = timer(3000).subscribe(() => {
      this.copyIcon.hide();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.timerSubscriber.unsubscribe();
  }
}
