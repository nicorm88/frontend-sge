import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';
import { AlumnadoComponent } from './alumnado.component';
import { AlumnadoRoutingModule } from './alumnado-routing.module';
import { EditAlumnoModule } from './edit-alumno/edit-alumno.module';
import { AddAlumnoModule } from './add-alumno/add-alumno.module';
import { DeleteAlumnoModule } from './delete-alumno/delete-alumno.module';


@NgModule({
  declarations: [AlumnadoComponent],
  imports: [
    CommonModule,
    AlumnadoRoutingModule,
    CrudMaterialModule,
    EditAlumnoModule,
    AddAlumnoModule,
    DeleteAlumnoModule
  ]
})
export class AlumnadoModule { }
