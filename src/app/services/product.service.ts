import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bom, Product } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    const { message } = error;
    this.error$.next(message);

    //console.log(error);
    return throwError(error);
  }

  getProductCategories(): Observable<any> {
    return this.http
      .get(`${environment.srvHost}api/product/categories`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getProductsByCaterory(category: string): Observable<any> {
    return this.http
      .get<Object[]>(`${environment.srvHost}api/product/category/${category}`)
      .pipe(
        map(res => {
          //console.log(res);
          return res.map((product: any) => ({ productNo: product.product, description: product.description }))
        }),
        catchError(this.handleError.bind(this))
      );
  }

  getProjectByProjectNo(projectNo: string): Observable<Product> {
    return this.http
      .get<any>(`${environment.srvHost}api/product/${projectNo}`)
      .pipe(
        map(res => {
          const parts: Bom[] = res.parts.map((bom: any) => ({ ...bom }))
          return {
            productNo: res.product,
            productDescription: res.productDescription,
            htmlLink: res.htmlLink,
            category: res.category,
            subtotal: res.subtotal,
            notes: res.notes,
            productListPrice: res.productListPrice,
            parts
          }
        }),
        catchError(this.handleError.bind(this))
      )
  }



}
