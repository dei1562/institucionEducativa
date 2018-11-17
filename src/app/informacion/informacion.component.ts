import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Carrera } from './../_interface/carrera';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  @Input('informacion')
  //informacion: string = 'Sergio';
  informacion: any;

  @Input()
  equipo: string = 'Sin equipo';

  @Output('onActivate')
  estado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  desactivarInformacion() {
    this.informacion.estado = false;
    this.estado.emit(false);
  }

  activarInformacion() {
    this.informacion.estado = true;
    this.estado.emit(true);
  }

}
