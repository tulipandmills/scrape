import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  sources: string[] = [];

  constructor(private http: HttpClient) { }

  // wikiTest = async (term: string) => {
  //   const request = new HttpRequest(
  //     "GET", "http://localhost:3000/wiki/" + term, {},
  //     { reportProgress: true });

  //   return this.http.request(request).toPromise();

  // }

  search = async (term: string) => {
    const sources = this.sources.join("|");
    const url = `http://localhost:3000/search/${sources}/${term}`;
    const request = new HttpRequest(
      "GET", url, {},
      { reportProgress: true });

    return this.http.request(request).toPromise();
  }

  getSources = async () => {
    const url = `http://localhost:3000/sites/meta`;
    const request = new HttpRequest(
      "GET", url, {},
      { reportProgress: true });

    return this.http.request(request).toPromise();
  }

  setSources(sources: string[]) {
    this.sources = sources;
  }
}
