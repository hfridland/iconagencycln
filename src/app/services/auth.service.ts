import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../interfaces';


@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  host = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  get token(): string | null {
    return localStorage.getItem('security-token');
  }

  private setToken(response: LoginResponse | null) {
    if (response) {
      localStorage.setItem('security-token', response.token);
    } else {
      localStorage.clear();
    }
  }

  public get email(): string {
    return localStorage!.getItem('login-email') as string;
  }

  public set email(email: string) {
    localStorage.setItem('login-email', email)
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    this.setToken(null);
    const { message } = error.error;
    this.error$.next(message);

    return throwError(error);
  }

  login(loginRequest: LoginRequest): Observable<any> {
    this.email = loginRequest.username;
    return this.http
      .post(`${this.host}api/auth/signin`, loginRequest)
      .pipe(
        // @ts-ignore
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }



}
