import { Component, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Input('results') results = [];
  @Input('headers') headers = [];
  @Input('settings') settings = [];
  @ViewChild('dt', { static: true }) dt: Table | undefined;
  data = [];
  sources = [{ 'site': 'feeds.nos.nl' }, { 'site': 'wikipedia.org' }]

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {

  }
  log(e: any) {
    console.log(e)
  }

  ngOnChanges(event: any) {
    const context = this;

    console.log(event)
    this.data = event.results
    this.headers = Object.assign(this.headers, this.headers)
    this.settings = event.settings.currentValue;
    if (typeof (this.settings) !== 'undefined') {



      //hide columns and sort
      Object.keys(this.settings).forEach((value: any) => {
        Object.values(context.settings).forEach((siteSettings: any) => {
          const site: any = Object.keys(siteSettings)[0];
          const hideColumns = siteSettings[site]?.hideColumns
          const priorityColumns = siteSettings[site]?.priorityColumns

          if (typeof (hideColumns) !== 'undefined') {
            console.log(hideColumns)
            this.headers = _.filter(this.headers, (header) => {
              return hideColumns.indexOf(header) === -1
            })
          }

          if (typeof (priorityColumns) !== 'undefined') {
            this.headers = _.orderBy(this.headers, priorityColumns)
          }

        })
      })
    }
  }

  solveChild(data: any, header: string) {
    let text = data[header]
    if (typeof (text) !== "undefined") {
      if (typeof (text) === "object") {
        try {
          const o = JSON.stringify(text);
          return o;
        } catch (ex) {
          return text;
        }
      }
      return text;
    } else {
      text = data[header];
      if (typeof (text) === "string") {
        return text;
      } else {
        return JSON.stringify(text);
      }
    }
  }

  getType(input: any) {
    if (typeof (input) === "undefined" || input === "") {
      return "text";
    }
    let o;
    try {
      o = JSON.parse(input);
    } catch (ex) {

    }
    if (typeof (o) !== "undefined" && Object.keys(o).length > 0) {
      if (o.type === 'image/jpeg') {
        return "image";
      } else {
        return "json";
      }
    } else if (input.toString().lastIndexOf("<") > 50) {
      return "html";
    } else if (input.toString().substring(0, 4) === "http") {
      return "url";
    }
    else {
      return "text"
    }
  }

  getHeaderType(header: string) {
    //Todo: get from config
    switch (header) {
      case "title":
        return "text";
      case "index":
        return "number";
      case "site":
        return "site";
      default:
        return "compact";
    }
  }

  cleanUrlFromImgObject(obj: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(obj.url);
  }

  openWindow(url: string) {
    window.open(url, '_new')
  }

}



