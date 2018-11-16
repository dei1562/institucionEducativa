import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Carrera } from './../_interface/carrera';
import { CarrerasService } from './../_service/carreras.service';

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

  constructor(private spinner : NgxSpinnerService, private carrerasService: CarrerasService) { }

  ngOnInit() {   

    //  let arrCarreraes = JUGADORES as any;
    this.carreras = [];
    this.showCarreras();
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

  }

}
