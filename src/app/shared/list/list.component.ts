import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spyfall-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  columnsData: { name: string, label: string }[] = [];

  @Input()
  data: any[] = [];

  columnsNames: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.columnsNames = this.columnsData.map(c => c.name);
  }

}
