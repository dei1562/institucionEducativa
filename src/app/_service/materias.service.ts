import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { Materia } from './../_interface/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  configUrl = 'https://raw.githubusercontent.com/dei1562/institucionEducativa/master/src/assets/data/materias.json'  
  
  constructor( private http : HttpClient ) { }

  arrMaterias: Array<Materia>;

  getMaterias() {

    return this.http.get<Materia>(this.configUrl)
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
