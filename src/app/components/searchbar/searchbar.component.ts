import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private _searchService: SearchService) { }

  @Input('disabled') disabled = false;

  data = [];
  results: any;

  onKeyPressHandler(e: any) {
    if (e.key == 'Enter' || this.results?.length === 0 || typeof (this.results) === 'undefined') {
      this.search(e);
      // } else {
      //   this.filter(e);
    }
  }

  search(e: any) {
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
