import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { MateriasComponent } from './materias/materias.component';
import { ProfesoresEstudiantesComponent } from './profesores-estudiantes/profesores-estudiantes.component';
import { FiltroPorLetraPipe } from './_pipes/filtro-por-letra.pipe';

import { FormsModule } from '@angular/forms' ;
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Angular Material Modules
import{
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CarrerasComponent,
    MateriasComponent,
    ProfesoresEstudiantesComponent,
    FiltroPorLetraPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
