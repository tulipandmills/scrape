import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { async } from '@angular/core/testing';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  sources: string[] = [];
  searchInput: any;


  constructor(private http: HttpClient) { }

  search = (term: string) => {
    if (typeof (term) === "undefined" || term.length === 0) {
      term = "%none%"
    }

    const sources = this.sources.join("|");
    const url = `${environment.apiUrl}/search/${sources}/${term}`;
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
    const url = `${environment.apiUrl}/sites/meta`;
    const request = new HttpRequest(
      "GET", url, {},
      { reportProgress: true });

    return this.http.request(request).toPromise();
  }

  setSources(sources: string[]) {
    this.sources = sources;
  }
}
