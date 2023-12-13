import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL = 'http://localhost:8081/api'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/produit')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  create(products: Products): Observable<any> {
    return this.httpClient.post(this.apiURL + '/produit', JSON.stringify(products), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  find(_id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/produit/' + _id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  update(_id: number, products: Products): Observable<any> {
    return this.httpClient.put(this.apiURL + '/produit/' + _id, JSON.stringify(products), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  delete(_id: number) {
    return this.httpClient.delete(this.apiURL + '/produit/' + _id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
