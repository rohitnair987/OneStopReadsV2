import { Injectable } from '@angular/core';
import { ISource } from 'src/models/source';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private sourceUrl = 'api/source/sampleSources.json';

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

  private handleError(err: HttpErrorResponse) {
    var errorMsg = `An error occured. ${err.error.message}`
    console.log(errorMsg);
    return throwError(errorMsg);
  }

}
