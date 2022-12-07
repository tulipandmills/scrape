import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { clone } from 'lodash';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Input('results') results = [];
  @Input('headers') headers = [];
  data = [];


  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {

  }

  ngOnChanges(event: any) {
    console.log(event)
    this.data = event.results
    this.headers = Object.assign(this.headers, this.headers)
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

  cleanUrlFromImgObject(obj: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(obj.url);
  }

  openWindow(url: string) {
    window.open(url, '_new')
  }

}



