import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAlumnoComponent } from './delete-alumno.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';



@NgModule({
  declarations: [DeleteAlumnoComponent],
  imports: [
    CommonModule,
    CrudMaterialModule
  ]
})
export class DeleteAlumnoModule { }
