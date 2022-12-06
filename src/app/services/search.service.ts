import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { async } from '@angular/core/testing';
import { catchError, of } from 'rxjs';


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

  search = (term: string) => {
    const sources = this.sources.join("|");
    const url = `http://localhost:3000/search/${sources}/${term}`;
    const request = new HttpRequest(
      "GET", url, {},
      { reportProgress: true });

    return this.http.request(request).pipe(catchError((err, src) => {
      console.log(err)
      return of(0)
    })).toPromise();
  }

  handleError(error: any, caught: any) {
    console.log(error)
    return of(0);
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
