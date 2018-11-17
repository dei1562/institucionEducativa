import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Carrera } from './../_interface/carrera';
import { Materia } from './../_interface/materia';
import { CarrerasService } from './../_service/carreras.service';
import { MateriasService } from './../_service/materias.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  step = 0;
  estatus:boolean = false;
  error : any;

  buscador: string = '';

  carreras:Carrera[];
  materias:Materia[];
  extra:any;

  constructor(private spinner : NgxSpinnerService, private carrerasService: CarrerasService, private materiasService: MateriasService, private router: Router) { }

  ngOnInit() {   

    this.carreras = [];
    this.materias = [];
    this.showCarreras();

    this.extra = {
      'materias': []
    };
  }

  actualizarEstado(carrera: Carrera, i: number, event) {
    carrera.estado = event;
    this.step = i;
  }

  mostrarDatos (i: number) {
    this.step = i;
  }

  activarCarrera (carrera: Carrera) {
    carrera.estado = true;
  }

  showCarreras(){
    this.spinner.show();
    this.carreras = [];

    this.carrerasService.getCarreras()
    .subscribe(
      (data: Carrera) => {
        let tmpData = {...data};

        for(let value in tmpData){
          this.carreras.push(tmpData[value]);
        }

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.error = error
      }
    );

    this.materiasService.getMaterias()
    .subscribe(
      (data: Materia) => {
        let tmpData = {...data};

        for(let value in tmpData){
          this.materias.push(tmpData[value]);
        }

        this.extra.materias = this.materias;

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.error = error
      }
    );
  }

  buscarNombre (codigo) {

    let nombre = '';

    if(this.materias.length > 0) {
      for(let value in this.materias){
                  
        if(this.materias[value].id  == codigo) {
          
          nombre = this.materias[value].nombre;
        }

      }
    }

    return nombre;
  }

  cargarInformacion(index) {
    this.router.navigate(['/materias', index]);
  }

}
