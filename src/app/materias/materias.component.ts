import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Materia } from './../_interface/materia';
import { Profesor } from './../_interface/profesor';
import { Estudiante } from './../_interface/estudiante';

import { MateriasService } from './../_service/materias.service';
import { ProfesoresService } from './../_service/profesores.service';
import { EstudiantesService } from './../_service/estudiantes.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  step = 0;
  estatus:boolean = false;
  error : any;

  buscador: string = '';

  profesores:Profesor[];
  estudiantes:Estudiante[];
  materias:Materia[];
  extra:any;

  materiaMostrar:any;

  constructor(private spinner : NgxSpinnerService, private estudiantesService: EstudiantesService, private profesoresService: ProfesoresService, private materiasService: MateriasService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {   

    this.profesores = [];
    this.estudiantes = [];
    this.materias = [];
    this.extra = {
      'profesores': [],
      'estudiantes': []
    }

    this.materiaMostrar = this.rutaActiva.snapshot.params.index;
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.materiaMostrar = params.index;
      }
    );    

    this.showMaterias();
  }

  actualizarEstado(materia: Materia, i: number, event) {
    materia.estado = event;
    this.step = i;
  }

  mostrarDatos (i: number) {
    this.step = i;
  }

  activarCarrera (materia: Materia) {
    materia.estado = true;
  }

  showMaterias(){
    this.spinner.show();
    this.materias = [];

    this.materiasService.getMaterias()
    .subscribe(
      (data: Materia) => {
        let tmpData = {...data};

        for(let value in tmpData){
          if(this.materiaMostrar){

            if(this.materiaMostrar == value){
              this.materias.push(tmpData[value]);
            }
          } else {

            this.materias.push(tmpData[value]);
          }
        }

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.error = error
      }
    );

    this.profesoresService.getProfesores()
    .subscribe(
      (data: Profesor) => {
        let tmpData = {...data};

        for(let value in tmpData){
          this.profesores.push(tmpData[value]);
        }

        this.extra.profesores = this.profesores;

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.error = error
      }
    );

    this.estudiantesService.getEstudiantes()
    .subscribe(
      (data: Estudiante) => {
        let tmpData = {...data};

        for(let value in tmpData){
          this.estudiantes.push(tmpData[value]);
        }

        this.extra.estudiantes = this.estudiantes;

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.error = error
      }
    );
  }

  buscarNombre (codigo, tipo) {

    let nombre = '';

    if(tipo == 'p') {

      if(this.profesores.length > 0) {
        for(let value in this.profesores){
                    
          if(this.profesores[value].id  == codigo) {
            
            nombre = this.profesores[value].nombre;
          }  
        }
      }

    } else if(tipo == 'e') {

      if(this.estudiantes.length > 0) {
        for(let value in this.estudiantes){
                    
          if(this.estudiantes[value].id  == codigo) {
            
            nombre = this.estudiantes[value].nombre;
          }  
        }
      }
    }
    

    return nombre;
  }

  cargarInformacion(index) {

  }

}
