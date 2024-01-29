import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { UnidadesCentrosComponent } from './unidades-centros.component';
import { AddUnidadCentrosComponent } from './add-unidad-centro/add-unidad-centros.component';
import { EditUnidadCentrosComponent } from './edit-unidad-centro/edit-unidad-centros.component';
import { DeleteUnidadCentrosComponent } from './delete-unidad-centro/delete-unidad-centros.component';
import { UnidadesCentrosRoutingModule } from './unidades-centros-routing.module';
import { DatosUnidadCentroModule } from './datos-unidad-centro/datos-unidad-centro.module';

@NgModule({
  declarations: [UnidadesCentrosComponent, AddUnidadCentrosComponent, EditUnidadCentrosComponent, DeleteUnidadCentrosComponent],
  imports: [
    CommonModule,
    UnidadesCentrosRoutingModule,
    CrudMaterialModule,
    DatosUnidadCentroModule
  ]
})
export class UnidadesCentrosModule { }
