import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
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
  message?: string;
  constructor(private _searchService: SearchService) { }

  @Input('disabled') disabled = false;

  data = [];
  results: any;

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
      this.message = "loading"
      this._searchService.search(e.target.value).then((r: any) => {
        if (r.body?.success) {
          if (typeof (r.body.data) !== 'undefined') {
            this.results = r.body.data;
            this.headers = r.body.headers;
            this.message = "done"
          } else {
            this.results = [];
            this.headers = [];
          }
        } else {
          //todo
          this.message = "An error occured"
          console.error('Error to be handled', r);
        }


      });
    }
  }

  solveChild(data: any, header: string) {
    let text = data[0][header];
    if (typeof (text) !== "undefined") {
      return text;
    } else {
      text = data.filter((r: any) => Object.keys(r)[0] === header)[0]?.header;
      if (typeof (text) !== "undefined") {
        return text;
      } else {
        let obj = data.filter((r: any) => r[header])[0];
        if ((typeof (obj) !== "undefined")) {
          text = obj[header]
        } else {
          text = undefined;
        }
        if (typeof (text) === "string") {
          return text;
        } else {
          return JSON.stringify(text);
        }
      }
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

  search_dep(e: any) {
    if (typeof (e.target?.value) !== 'undefined') {
      this._searchService.search(e.target.value).then((r: any) => {
        if (r.body?.success) {
          if (typeof (r.body.data) !== 'undefined') {
            this.results = r.body.data;
            this.headers = Object.keys(this.results[0]);
          } else {
            this.results = [];
            this.headers = [];
          }
        } else {
          //todo
          console.error('Error to be handled', r);
        }


      });
    }


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
