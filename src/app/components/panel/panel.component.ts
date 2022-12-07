import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent implements OnInit {

  @Output() onResults = new EventEmitter();
  searchbarDisabled: boolean = true;
  results = [];
  headers = [];



  constructor() { }

  ngOnInit(): void {
  }



  sourcesChanged(event: any) {
    this.searchbarDisabled = event.length === 0;
  }

  receivedResults(event: any) {
    this.headers = { ...this.headers }
    this.results = event;
  }

  receivedHeaders(event: any) {
    this.headers = event;
  }

}
