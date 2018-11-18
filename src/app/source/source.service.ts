import { Injectable } from '@angular/core';
import { ISource, Source } from 'src/models/source';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private sourceUrl = 'api/source/sampleSources.json';
  private sourceApiUrl = 'http://localhost:3000/api/source-add';

  constructor(private http: HttpClient) { }

  getSources(): Observable<ISource[]> {
    return this.http
      .get<ISource[]>(this.sourceUrl)
      .pipe(
        // use tap while debugging
        // tap(rawData => console.log("Full data: " + JSON.stringify(rawData))),
        catchError(this.handleError)
      );
  }

  addSource(source: Source) : Observable<any> {
    return this.http.post<any>(this.sourceApiUrl, source)
      .pipe(
        // use tap while debugging
        tap(rawData => console.log("Full data: " + JSON.stringify(rawData))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    var errorMsg = `An error occured. ${err.error.message}`
    console.log(errorMsg);
    return throwError(errorMsg);
  }

}
