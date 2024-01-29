import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Familia } from 'src/app/shared/interfaces/familia';
import { FamiliasService } from 'src/app/services/familias.service';
import { CLOSE, INVALID_FORM, ENTIDAD_CENTRO as ENTIDAD_CENTRO } from '../../shared/messages';
import { UnidadesCentrosService } from 'src/app/services/unidades-centros.service';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-add-unidad-centros',
  templateUrl: './add-unidad-centros.component.html'
})
export class AddUnidadCentrosComponent implements OnInit {
  centroForm: FormGroup;

  ciclo : Ciclo[];

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddUnidadCentrosComponent>,
    private snackBar: MatSnackBar,
    private servicioCentros: UnidadesCentrosService,
    private servicioCiclos: CiclosService
  ){ }

  ngOnInit(): void {
    this.centroForm = new FormGroup({
      unidad_centro: new FormControl(null, Validators.required),
      id_ciclo: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.getCiclos();
    this.ENTIDAD = ENTIDAD_CENTRO;
  }

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclo = RESPONSE.data as Ciclo[];
    }
  }

  async confirmAdd() {
    if (this.centroForm.valid) {
      const centro = this.centroForm.value as UnidadCentro;

      const RESPONSE = await this.servicioCentros.addUnidadCentro(centro).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }
}
