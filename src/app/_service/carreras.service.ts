import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { Carrera } from './../_interface/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  configUrl = 'https://raw.githubusercontent.com/dei1562/institucionEducativa/master/src/assets/data/carreras.json'  
  
    constructor( private http : HttpClient ) { }

    arrCarreras: Array<Carrera>;
  
    getCarreras() {
  
      return this.http.get<Carrera>(this.configUrl)
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

    getNombreEquipo(key)   {

      return this.getCarreras()
            .subscribe(
              (data) => {
                let tmpData = {...data};

                for(let value in tmpData){
                  
                  if(tmpData[value].id  == key) {
                    
                    return tmpData[value].nombre;
                  }

                }
              }
            );
    }
}
