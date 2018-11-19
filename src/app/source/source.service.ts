import { Injectable } from '@angular/core';
import { Source } from 'src/models/source';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private sourceApiUrl = 'http://localhost:3000/api/source';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getSources(): Observable<Source[]> {
    return this.http.get<Source[]>(`${this.sourceApiUrl}/get`)
      .pipe(
        // use tap while debugging
        // tap(rawData => console.log("getSources Full data: " + JSON.stringify(rawData))),
        catchError(this.handleError)
      );
  }

  getSource(id: string): Observable<Source> {
    return this.http.get<Source>(`${this.sourceApiUrl}/get/${id}`)
      .pipe(
        // tap(rawData => console.log("getSource Full data: " + JSON.stringify(rawData))),
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  upsertSource(source: Source) : Observable<any> {
    var url = 'add';
    if (source._id) {
      url = 'update';
    }

    return this.http.post<any>(`${this.sourceApiUrl}/${url}`, source)
      .pipe(
        // tap(rawData => console.log("addSource Full data: " + JSON.stringify(rawData))),
        catchError(this.handleError)
      );
  }

  deleteSource(id: string): Observable<any> {
    return this.http.delete(`${this.sourceApiUrl}/delete/${id}`)
      .pipe(
        // tap(rawData => console.log("deleteSource Full data: " + JSON.stringify(rawData))),
        map(this.extractData),
        catchError(this.handleError));
  }

  getNews(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        map(this.extractData),
        catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    var errorMsg = `An error occured. ${err.error.message}`
    console.log(errorMsg);
    return throwError(errorMsg);
  }

}
