import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarrerasComponent } from './carreras/carreras.component';
import { MateriasComponent } from './materias/materias.component';
import { ProfesoresEstudiantesComponent } from './profesores-estudiantes/profesores-estudiantes.component';

const routes: Routes = [
  { path: 'carreras', component: CarrerasComponent},
  { path: 'materias', component: MateriasComponent},
  { path: 'materias/:index', component: MateriasComponent},  
  { path: 'profesoresEstudiantes/:tipo', component: ProfesoresEstudiantesComponent},
  { path: '', redirectTo: '/carreras', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
