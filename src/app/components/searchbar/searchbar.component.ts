import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  text: any;
  pages: any;
  headers: string[] = [];
  @Output() onResults = new EventEmitter();
  @Output() onHeadersChanged = new EventEmitter();
  @Output() onReceivedSettings = new EventEmitter();


  @ViewChild('searchInput') searchInput: any;




  constructor(private _searchService: SearchService, private messageService: MessageService) {

  }

  @Input('disabled') disabled = false;


  data = [];
  results: any;
  showJson = false;


  onKeyPressHandler(e: any) {
    if (e.key == 'Enter') {
      this.search(true);
    }
  }

  searchClick() {
    this.search(true);
  }

  updateValue(e: any) {
    this._searchService.searchInput = this.searchInput.nativeElement.value;
  }

  search(notifyOnEmpty?: boolean) {
    if (this._searchService.sources.length > 0) {
      let term = this._searchService.searchInput
      if (typeof (term) !== 'undefined' && term.length > 0) {
        this.messageService.add({ severity: 'info', summary: 'Bezig met zoeken...', detail: '', key: 'searchingMsg' });
        this._searchService.search(term).then((r: any) => {
          if (r.body?.success) {
            if (typeof (r.body.data) !== 'undefined') {
              this.results = r.body.data;
              this.headers = r.body.headers;
              this.onReceivedSettings.emit(r.body.resultSettings);
              this.messageService.clear('searchingMsg');
              this.messageService.add({ severity: 'success', summary: 'Klaar', detail: 'Er zijn ' + this.results.length + ' resultaten gevonden', key: 'otherMsg' });
              this.onResults.emit(this.results)
              this.onHeadersChanged.emit(this.headers)
            } else {
              this.onResults.emit([])
              this.onHeadersChanged.emit([]);
            }
          } else {
            //todo
            this.messageService.add({ severity: 'warn', summary: 'Sorry...', detail: 'Something went wrong. If this error reoccures, please contact the developer', key: 'otherMsg' });
            console.error('Error to be handled', r);
          }
        });
      } else {
        if (notifyOnEmpty) {
          this.messageService.add({ severity: 'info', summary: 'Zoekterm', detail: 'Vul hier uw zoekterm in, en druk op enter', key: 'otherMsg' });
        }

      }


    } else {
      this.messageService.add({ severity: 'info', summary: 'Bronnen', detail: 'Gelieve eerst een of meerdere zoekbronnen te selecteren', key: 'otherMsg' });
    }
  }

  arrayToObject(arr: any[]) {
    let o = {}
    let i = 0;
    arr.forEach((item) => {
      Object.assign(o, { [i]: item })
      i++;

    })
    return o
  }


  filter(e: any) {
    const context = this;
    if (this.pages) {
      const searchQuery = e.query || e.target?.value;
      if (typeof (searchQuery) !== 'undefined') {
        this.results = context.pages.filter((r: any) => {
          return r.title.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
        });
      } else {
        this.clearFilter();
      }
      context.results = Object.values({ ...this.results });
    }
  }


  clearFilter() {
    this.results = this.pages;
  }
  ngOnInit(): void {
  }

}
