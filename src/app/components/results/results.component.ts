import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Input('results') results = [];
  @Input('headerInput') headerInput = [];
  data = [];
  headers: any;

  ngOnInit(): void {

  }

  ngOnChanges(event: any) {
    console.log(event)
    this.data = this.results
    this.headers = new Array(...this.headerInput)
  }

  solveChild(data: any, header: string) {
    let text = data[header];
    if (typeof (text) !== "undefined") {
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

  getType(text: string) {
    if (typeof (text) === "undefined" || text === "") {
      return "text";
    }
    let o;
    try {
      o = JSON.parse(text);
    } catch (ex) {
    }
    if (typeof (o) !== "undefined" && Object.keys(o).length > 0) {
      if (o.type === 'image/jpeg') {
        return "image";
      } else {
        return "json";
      }
    } else if (text.toString().lastIndexOf("<") > 50) {
      return "html";
    } else if (text.toString().substring(0, 4) === "http") {
      return "url";
    }
    else {
      return "text"
    }
  }
}



