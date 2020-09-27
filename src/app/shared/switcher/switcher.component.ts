import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'spyfall-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {

  @Input() defaultSwitch: { iconName: string, text: string, value: string };
  @Input() otherSwitch: { iconName: string, text: string, value: string };
  @Output() onSwitch: EventEmitter<string> = new EventEmitter<string>();

  selectedValue: string;
  text: string;
  iconUrl: string;

  constructor() { }

  clickAction = () => {
    this.switchValues();
  }

  switchValues = () => {
    if(this.selectedValue === this.defaultSwitch.value) {
      this.text = this.otherSwitch.text;
      this.iconUrl = this.generateIconUrl(this.otherSwitch.iconName);
      this.selectedValue = this.otherSwitch.value;
    } else {
      this.text = this.defaultSwitch.text;
      this.iconUrl = this.generateIconUrl(this.defaultSwitch.iconName);
      this.selectedValue = this.defaultSwitch.value;
    }
    this.onSwitch.emit(this.selectedValue);
  }

  generateIconUrl = (iconName: string): string => {
    return `assets/icons/${iconName}`;
  }

  ngOnInit(): void {
    this.iconUrl = this.generateIconUrl(this.defaultSwitch.iconName);
    this.text = this.defaultSwitch.text;
    this.selectedValue = this.defaultSwitch.value;
  }

}
