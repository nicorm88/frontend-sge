import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadesCentrosComponent } from './unidades-centros.component';

const routes: Routes = [{ path: '', component: UnidadesCentrosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesCentrosRoutingModule { }
