import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresEstudiantesComponent } from './profesores-estudiantes.component';

describe('ProfesoresEstudiantesComponent', () => {
  let component: ProfesoresEstudiantesComponent;
  let fixture: ComponentFixture<ProfesoresEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesoresEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
