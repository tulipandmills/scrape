import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  constructor(private _searchService: SearchService, private sanitizer: DomSanitizer, private messageService: MessageService) { }

  @Input('disabled') disabled = false;


  data = [];
  results: any;
  showJson = false;


  onKeyPressHandler(e: any) {
    if (e.key == 'Enter') {
      this.search(e);
      // } else {
      //   this.filter(e);

    }
  }

  search(e: any) {
    //TODO: Take all headers from all sites
    //TODO: Filter for non-term searching queries (like NOS feed)
    //TODO: Load site configs
    if (typeof (e.target?.value) !== 'undefined') {
      this.messageService.add({ severity: 'info', summary: 'Searching...', detail: '', key: 'searchingMsg' });
      this._searchService.search(e.target.value).then((r: any) => {
        if (r.body?.success) {
          if (typeof (r.body.data) !== 'undefined') {
            this.results = r.body.data;
            this.headers = r.body.headers;
            this.messageService.clear('searchingMsg');
            this.messageService.add({ severity: 'success', summary: 'Done', detail: '', key: 'otherMsg' });
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

  cleanUrlFromImgObject(obj: any) {
    obj = JSON.parse(obj);
    return this.sanitizer.bypassSecurityTrustResourceUrl(obj.url);

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

  openWindow(url: string) {
    window.open(url, '_new')
  }
  clearFilter() {
    this.results = this.pages;
  }
  ngOnInit(): void {
  }

}
