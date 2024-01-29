import { DatosBasicosUnidadCentroComponent } from './datos-basicos-unidad-centro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';
import { DatosBasicosUnidadCentroRoutingModule } from './datos-basicos-unidad-centro-routing.module';


@NgModule({
  declarations: [DatosBasicosUnidadCentroComponent],
  imports: [
    CommonModule,
    DatosBasicosUnidadCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosBasicosUnidadCentroModule { }
