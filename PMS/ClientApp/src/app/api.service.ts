import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { retry } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public IsAdmin : boolean = false;
  public static AuthenticationToken = "";
  public CurrentMenuName : string = "";
  public BASE_URL = "";

   constructor(public httpClient : HttpClient, public datePipe: DatePipe) { 
    const baseHRef = document.querySelector('base')?.getAttribute('href');
    if(baseHRef === "/"){
      //this.BASE_URL = "http://localhost:44307/api";
      this.BASE_URL = "http://localhost:44306/api";
    }
    else{
      this.BASE_URL = baseHRef + 'api';
    }
  }

  // #region CreateClientHeader
  createClientHeader(): { headers: HttpHeaders } {
    let token = '';
    if (ApiService.AuthenticationToken) {
      token = `Bearer ${ApiService.AuthenticationToken}`;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }
  // #endregion
  
  // #region GET Methods
  public HttpGet<T>(endpoint: string, params?: any): Observable<T> {
    var options: HttpHeaders = new HttpHeaders();
    if (!options) {
      options = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
      options = options.append('Accept', 'application/json');
    }
    if (ApiService.AuthenticationToken) {
      options = options.append('Authorization', `Bearer ${ApiService.AuthenticationToken}`);
    }
    return this.httpClient.get<T>(this.BASE_URL + endpoint, { headers: options});
  }
  // #endregion
  
  // #region POST Method
  public HttpPost<T>(endpoint: string, body: any): Observable<T> {
    let options: HttpHeaders = new HttpHeaders();
    if (!options) {
      options = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
      options = options.append('Accept', 'application/json');
    }
    if (ApiService.AuthenticationToken) {
      options = options.append('Authorization', `Bearer ${ApiService.AuthenticationToken}`);
    }
    return this.httpClient.post<T>(this.BASE_URL + endpoint, body, { headers: options });
  }
  // #endregion
  
  // #region HttpDelete
  public HttpDelete<T>(url: string, key: any): Observable<T> {
    return this.httpClient.delete<T>(this.BASE_URL + url + key, this.createClientHeader()).pipe(
      catchError(this.HttpClientError)
    );
  }
  //#endregion
  
  // #region HttpGetByKey
  public HttpGetByKey<T>(url: string, key: any): Observable<T> {
    return this.httpClient.get<T>(this.BASE_URL + url + key, this.createClientHeader()).pipe(
      catchError(this.HttpClientError)
    );
  }
  //#endregion
  
  // #region HttpPostFile
  public HttpPostFile(url: string, body: any): Observable<Blob> {
    var options: HttpHeaders | null = null;
    if (!options) {
      options = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
      options = options.append('Accept', 'application/json');
    }
    if (ApiService.AuthenticationToken) {
      options = options.append('Authorization', `Bearer ${ApiService.AuthenticationToken}`);
    }
    // return this.httpClient.post<Blob>(this.BASE_URL + url, body, { headers: options, withCredentials: true }).pipe(catchError(this.HttpClientError));
    return this.httpClient.post<Blob>(this.BASE_URL + url, body, { headers: options }).pipe(catchError(this.HttpClientError));
  }
  //#endregion
  
  // #region HttpPostBlob
  public HttpPostBlob(url: string, body: any): Observable<any> {
    var options: HttpHeaders | null = null;
    if (!options) {
      options = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
      options = options.append('Accept', 'application/json');
    }
    if (ApiService.AuthenticationToken) {
      options = new HttpHeaders();
      options = options.append('Authorization', `Bearer ${ApiService.AuthenticationToken}`);
    }
    // return this.httpClient.post<Blob>(this.BASE_URL + url, body, { headers: options, withCredentials: true }).pipe( catchError(this.HttpClientError ));
    return this.httpClient.post<Blob>(this.BASE_URL + url, body, { headers: options }).pipe( catchError(this.HttpClientError ));
  }
  //#endregion
  
  // #region HttpDownloadFileA
  public HttpDownloadFileA(url: string, body: any): Observable<Blob> {
    var options: HttpHeaders | null = null;
    if (!options) {
      options = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
      options = options.append('Accept', 'application/json');
    }
    if (ApiService.AuthenticationToken) {
      options = new HttpHeaders();
      options = options.append('Authorization', `Bearer ${ApiService.AuthenticationToken}`);
    }
    return this.httpClient.post<Blob>(this.BASE_URL + url, body, {headers: options, responseType: 'blob' as 'json'}).pipe( catchError( this.HttpClientError ) );
  }
  //#endregion
  
  // #region HttpDownloadFileB
  public HttpDownloadFileB(url: string, body: any): Observable<Blob> {
    var options: HttpHeaders | null = null;
    if (!options) {
      options = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
      options = options.append('Accept', 'application/json');
    }
    return this.httpClient.post<Blob>(this.BASE_URL + url, body, { headers: options, responseType: 'blob' as 'json'});
  }
  //#endregion
  
  // #region HttpClientError
  public HttpClientError(error: HttpErrorResponse) {
    return throwError(error.error || 'An error has been occurred. Please try again or contact to system administrator');
  }
  //#endregion
}
