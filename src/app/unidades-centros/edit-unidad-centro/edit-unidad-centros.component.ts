import { UnidadCentro } from './../../shared/interfaces/unidad-centro';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, ENTIDAD_CENTRO, ERROR } from '../../shared/messages';
import { UnidadesCentrosService } from 'src/app/services/unidades-centros.service';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';


@Component({
  selector: 'app-edit-unidad-centros',
  templateUrl: './edit-unidad-centros.component.html'
})
export class EditUnidadCentrosComponent implements OnInit {

  ciclo : Ciclo[];
  centroForm: FormGroup;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditUnidadCentrosComponent>,
    private snackBar: MatSnackBar,
    private servicioCentro: UnidadesCentrosService,
    private servicioCiclos: CiclosService,
    @Inject(MAT_DIALOG_DATA) public centro: UnidadCentro
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_CENTRO;
    this.centroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.centro.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.centro.unidad_centro, Validators.required),
      observaciones: new FormControl(this.centro.observaciones),
      id_ciclo: new FormControl(this.centro.id_ciclo)
    });
    this.getCiclos();
  }

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclo = RESPONSE.data as Ciclo[];
    }
  }

  async confirmEdit(){
    if (this.centroForm.valid) {
      const centroForm = this.centroForm.value;

      const RESPONSE = await this.servicioCentro.editUnidadCentro(centroForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
