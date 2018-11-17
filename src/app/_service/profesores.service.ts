import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { Profesor } from './../_interface/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  configUrl = 'https://raw.githubusercontent.com/dei1562/institucionEducativa/master/src/assets/data/profesores.json'  
  
  constructor( private http : HttpClient ) { }

  arrProfesores: Array<Profesor>;

  getProfesores() {

    return this.http.get<Profesor>(this.configUrl)
          .pipe(
            retry(3),
            catchError(this.handleError)
          );
  }

  private handleError (error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error ('An error occurred:' , error.error.message);
    } else {
      console.error (
        'Backend returned code $(error.status), ' + 'body was: ${error.error}'
      );
    }
      return throwError(
        'something bad happened ; please try again later.');

  };
}
