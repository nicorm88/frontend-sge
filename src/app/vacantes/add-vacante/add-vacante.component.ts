import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, INVALID_FORM, ENTIDAD_VACANTE } from '../../shared/messages';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { VacanteService } from 'src/app/services/vacantes.service';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { EntidadesService } from 'src/app/services/entidades.service';
import { UnidadesCentrosService } from 'src/app/services/unidades-centros.service';
import { Vacante } from 'src/app/shared/interfaces/vacante';

@Component({
  selector: 'app-add-vacante',
  templateUrl: './add-vacante.component.html',
  styleUrls: ['./add-vacante.component.scss']
})
export class AddVacanteComponent implements OnInit {
  vacanteForm: FormGroup;

  entidad : Entidad[];
  unidadCentro : UnidadCentro[];

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddVacanteComponent>,
    private snackBar: MatSnackBar,
    private servicioVacantes: VacanteService,
    private servicioEntidades: EntidadesService,
    private servicioUnidadesCentro: UnidadesCentrosService
  ){ }

  ngOnInit(): void {
    this.vacanteForm = new FormGroup({
      id_unidad_centro: new FormControl(null, Validators.required),
      id_entidad: new FormControl(null, Validators.required),
      num_alumnos: new FormControl(null, Validators.required)
    });
    this.getEntidades();
    this.getUnidadesCentro();
    this.ENTIDAD = ENTIDAD_VACANTE;
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  async getEntidades(){
    const RESPONSE = await this.servicioEntidades.getAllEntidades().toPromise();
    if (RESPONSE.ok){
      this.entidad = RESPONSE.data as Entidad[];
    }
  }

  async getUnidadesCentro(){
    const RESPONSE = await this.servicioUnidadesCentro.getAllUnidadesCentros().toPromise();
    if (RESPONSE.ok){
      this.unidadCentro = RESPONSE.data as UnidadCentro[];
    }
  }

  async confirmAdd() {
    if (this.vacanteForm.valid) {
      const vacante = this.vacanteForm.value as Vacante;

      const RESPONSE = await this.servicioVacantes.addVacante(vacante).toPromise();
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
