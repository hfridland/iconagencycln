import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bom, PartHeader } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    /*this.setToken(null);
    const { message } = error.error;
    this.error$.next(message);*/

    console.log(error);
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
          return res.map((part: any) => ({ partNo: part.part, description: part.description }))
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
