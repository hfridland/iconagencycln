import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    const { message } = error;
    this.error$.next(message);

    //console.log(error);
    return throwError(error);
  }

  getQuoteWithoutSDPriceReport(quoteId: string) {
    this.http.get(`${environment.srvHost}api/reportToken/QuoteWithoutSDPrice/${quoteId}`, {
      responseType: 'text'
    })
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe(token => {
        // console.log('token', token);
        //window.open(`${environment.srvHost}api/report/QuoteWithoutSDPrice/${token}`, '_blank');
        window.open(`/api/report/QuoteWithoutSDPrice/${token}`, '_blank');
      });
  }

}
