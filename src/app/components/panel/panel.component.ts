import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  searchbarDisabled: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  sourcesChanged(event: any) {
    console.log(event)
    this.searchbarDisabled = event.length === 0;
  }

}
