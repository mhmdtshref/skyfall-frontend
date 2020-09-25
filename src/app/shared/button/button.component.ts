import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'spyfall-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  type = 'primary';

  @Input()
  text = 'Submit';

  @Output()
  clickAction: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  onClick = () => {
    if (this.clickAction) {
      this.clickAction.emit();
    }
  }

  ngOnInit(): void {
  }

}
