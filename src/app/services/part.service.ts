import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bom } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class PartService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    const { message } = error;
    this.error$.next(message);

    return throwError(error);
  }

  getPartCategories(): Observable<any> {
    return this.http
      .get(`${environment.srvHost}api/bom/categories`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getPartsByCaterory(category: string): Observable<any> {
    return this.http
      .get<Object[]>(`${environment.srvHost}api/bom/category/${category}`)
      .pipe(
        map(res => {
          //console.log(res);
          return res.map((part: any) => ({ partNo: part.part, sku: part.sku, description: part.description }))
        }),
        catchError(this.handleError.bind(this))
      );
  }

  getPartByPartNo(partNo: string): Observable<Bom> {
    return this.http
      .get<any>(`${environment.srvHost}api/bom/part?part=${partNo}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  isPartNoInUse(partNo: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${environment.srvHost}api/bom/part/inUse?partNo=${partNo}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  saveBom(bom: Bom): Observable<Bom> {
    return this.http
      .post<Bom>(`${environment.srvHost}api/bom/`, bom)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
