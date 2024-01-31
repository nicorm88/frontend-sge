import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAlumnoComponent } from './add-alumno.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';



@NgModule({
  declarations: [AddAlumnoComponent],
  imports: [
    CommonModule,
    CrudMaterialModule
  ]
})
export class AddAlumnoModule { }
