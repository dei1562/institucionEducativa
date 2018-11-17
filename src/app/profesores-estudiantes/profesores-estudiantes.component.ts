import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Profesor } from './../_interface/profesor';
import { Estudiante } from './../_interface/estudiante';

import { ProfesoresService } from './../_service/profesores.service';
import { EstudiantesService } from './../_service/estudiantes.service';

@Component({
  selector: 'app-profesores-estudiantes',
  templateUrl: './profesores-estudiantes.component.html',
  styleUrls: ['./profesores-estudiantes.component.scss']
})
export class ProfesoresEstudiantesComponent implements OnInit {

  step = 0;
  estatus:boolean = false;
  error : any;

  titulo: string = '';
  buscador: string = '';
  placeholder: string = '';

  profesores:Profesor[];
  estudiantes:Estudiante[];
  datos:any;

  tipo:any;
  index:any;

  constructor(private spinner : NgxSpinnerService, private estudiantesService: EstudiantesService, private profesoresService: ProfesoresService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {    

    this.tipo = this.rutaActiva.snapshot.params.tipo;
    this.index = this.rutaActiva.snapshot.params.index;

    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.tipo = params.tipo;
        this.index = params.index;

        this.profesores = [];
        this.estudiantes = [];
        this.datos = [];
        
        if(this.tipo == 'profesores') {
          this.titulo = 'Profesores';
          this.placeholder = 'Buscar Profesor';
        }
    
        if(this.tipo == 'estudiantes') {
          this.titulo = 'Estudiantes';
          this.placeholder = 'Buscar Estudiante';      
        }

        this.showRegistros();

      }
    );
  }

  mostrarDatos (i: number) {
    this.step = i;
  }

  activarRegistro (dato: any) {
    dato.estado = true;
  }

  desactivarInformacion(dato: any) {
    dato.estado = false;
  }

  showRegistros(){
    this.spinner.show();
    this.datos = [];

    if(this.tipo == 'profesores') {
      
      this.profesoresService.getProfesores()
      .subscribe(
        (data: Profesor) => {
          let tmpData = {...data};
  
          for(let value in tmpData){

            if(this.index){

              if(this.index == value){
                this.profesores.push(tmpData[value]);
              }
            } else {
  
              this.profesores.push(tmpData[value]);
            }
          }
  
          this.datos = this.profesores;
  
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.error = error
        }
      );
    }

    if(this.tipo == 'estudiantes') {

      this.estudiantesService.getEstudiantes()
      .subscribe(
        (data: Estudiante) => {
          let tmpData = {...data};
  
          for(let value in tmpData){
            if(this.index){

              if(this.index == value){
                this.estudiantes.push(tmpData[value]);
              }
            } else {
  
              this.estudiantes.push(tmpData[value]);
            }
          }
  
          this.datos = this.estudiantes;
  
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.error = error
        }
      );
    }

  }

  
}
