import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Carrera } from './../_interface/carrera';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  @Input('informacion')
  informacion: any;

  @Input('extra')
  extra: any;

  @Input('ubicacion')
  ubicacion: any;

  @Output('onActivate')
  estado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("ubicacion", this.ubicacion);
  }

  desactivarInformacion() {
    this.informacion.estado = false;
    this.estado.emit(false);
  }

  activarInformacion() {
    this.informacion.estado = true;
    this.estado.emit(true);
  }

  buscarNombre (codigo, tipo) {

    let nombre = '';

    if(this.ubicacion == 'carreras') {
      if(this.extra.materias.length > 0) {
        for(let value in this.extra.materias){
                    
          if(this.extra.materias[value].id  == codigo) {
            
            nombre = this.extra.materias[value].nombre;
          }
  
        }
      }
    }else if(this.ubicacion == 'materias') {
      if(tipo == 'p') {
      
        if(this.extra && this.extra.profesores.length > 0) {
          for(let value in this.extra.profesores){
                      
            if(this.extra.profesores[value].id  == codigo) {
              
              nombre = this.extra.profesores[value].nombre;
            }  
          }
        }
  
      } else if(tipo == 'e') {
  
        if(this.extra && this.extra.estudiantes.length > 0) {
          for(let value in this.extra.estudiantes){
                      
            if(this.extra.estudiantes[value].id  == codigo) {
              
              nombre = this.extra.estudiantes[value].nombre;
            }  
          }
        }
      }
    }

    return nombre;
  }

  cargarInformacion(index, tipo) {
    if(this.ubicacion == 'carreras') {

      this.router.navigate(['/materias', index]);

    } else if (this.ubicacion == 'materias') {

      if(tipo == 'p') {

        this.router.navigate(['/profesoresEstudiantes', 'profesores', index]);
      }else if (tipo == 'e') {
  
        this.router.navigate(['/profesoresEstudiantes', 'estudiantes', index]);
      }
    }
  }

}
