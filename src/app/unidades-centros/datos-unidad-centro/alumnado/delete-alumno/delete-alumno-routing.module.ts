import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteAlumnoComponent } from './delete-alumno.component';

const routes: Routes = [{ path: '', component: DeleteAlumnoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeletealumnoRoutingModule { }
