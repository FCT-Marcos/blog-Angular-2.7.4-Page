import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError, tap, map } from 'rxjs';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RegisterRequest } from '../../interfaces/RegisterRequest';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userToken: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient, private router:Router) {
    this.isUserLogged = new BehaviorSubject<boolean>(sessionStorage.getItem("access_token") != null);
    this.userToken = new BehaviorSubject<String>(sessionStorage.getItem("access_token") || "");
  }

  login(credentials:LoginRequest): Observable<any> {
    return this.http.post<any>(`${environment.URL_API_AUTH}/login`, credentials, httpOptions).pipe(
      tap((userData) => {
        sessionStorage.setItem("access_token", userData.token);
        this.userToken.next(userData.token);
        this.isUserLogged.next(true);
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  }

  register(credentials:RegisterRequest): Observable<any> {
    return this.http.post<any>(`${environment.URL_API_AUTH}/register`, credentials, httpOptions).pipe(
      tap((userData) => {
        sessionStorage.setItem("access_token", userData.token);
        this.userToken.next(userData.token);
        this.isUserLogged.next(true);
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem("access_token");
    this.isUserLogged.next(false)
    this.router.navigateByUrl("/login")
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Se ha producido un error ", error.error)
    }else{
      console.error("Error status code ", error.status)
    }

    return throwError(() => new Error("Algo falló, Por favor intentelo de nuevo"))
  }

}