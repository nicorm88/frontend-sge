import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTIDAD_CENTRO } from '../../../shared/messages';
import { DatosUnidadCentroComponent } from '../datos-unidad-centro.component';
import { UnidadesCentrosService } from 'src/app/services/unidades-centros.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-datos-basicos-unidad-centro',
  templateUrl: './datos-basicos-unidad-centro.component.html',
  styleUrls: ['./datos-basicos-unidad-centro.component.scss']
})
export class DatosBasicosUnidadCentroComponent implements OnInit {

  datosBasicosForm: FormGroup;
  alumnado: Alumno[];

  ENTIDAD: String;
  ciclo: Ciclo[];

  constructor(
    private datosUnidadCentro: DatosUnidadCentroComponent,
    public unidadCentroService: UnidadesCentrosService,
    private servicioCiclos: CiclosService,
  ) {
    this.alumnado = this.datosUnidadCentro.datosEditarUnidadCentro.alumnado;
  }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_CENTRO;
    this.setForm();

    this.datosBasicosForm.valueChanges.subscribe(form => {
      this.unidadCentroService.setDatosBasicosUnidadCentro(form);
    });
    this.getCiclos();
  }

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclo = RESPONSE.data as Ciclo[];
    }
  }

  setForm(): void {
    this.datosBasicosForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadCentroService.unidadCentro.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.unidadCentroService.unidadCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadCentroService.unidadCentro.id_ciclo, Validators.required),
      observaciones: new FormControl(this.unidadCentroService.unidadCentro.observaciones, Validators.required)
    });
  }
}
