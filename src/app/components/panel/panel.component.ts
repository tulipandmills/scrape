import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ResultsComponent } from '../results/results.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent implements OnInit {

  @Output() onResults = new EventEmitter();
  @ViewChild('searchBar') searchbarComponent: SearchbarComponent | undefined;
  @ViewChild('resultsComponent') resultsComponent: ResultsComponent | undefined;
  searchbarDisabled: boolean = true;
  results = [];
  headers = [];
  resultSettings: any;



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
  receivedSettings(event: any) {
    this.resultSettings = event;

  }

  toggleJsonDialogOnResultsComponent() {
    this.resultsComponent?.toggleJsonDialog()
  }

  sendSearchToSearchBar(event: any) {
    this.searchbarComponent?.search(event, false)
  }

}
