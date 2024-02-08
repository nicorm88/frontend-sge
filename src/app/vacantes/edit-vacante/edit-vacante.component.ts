import { UnidadCentro } from './../../shared/interfaces/unidad-centro';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, ENTIDAD_VACANTE, ERROR } from '../../shared/messages';
import { VacanteService } from 'src/app/services/vacantes.service';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { EntidadesService } from 'src/app/services/entidades.service';
import { UnidadesCentrosService } from 'src/app/services/unidades-centros.service';
import { Vacante } from '../../shared/interfaces/vacante';
import { Alumno, AlumnoVacante } from 'src/app/shared/interfaces/alumno';


@Component({
  selector: 'app-edit-vacante',
  templateUrl: './edit-vacante.component.html',
  styleUrls: ['./edit-vacante.component.scss']
})
export class EditVacanteComponent implements OnInit {
  vacanteForm: FormGroup;

  entidad : Entidad[];
  unidadCentro : UnidadCentro[];

  alumnosSeleccionados: AlumnoVacante[];
  alumnosNoSeleccionados: AlumnoVacante[];

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<EditVacanteComponent>,
    private snackBar: MatSnackBar,
    private servicioVacantes: VacanteService,
    private servicioEntidades: EntidadesService,
    @Inject(MAT_DIALOG_DATA) public vacante: Vacante,
    private servicioUnidadesCentro: UnidadesCentrosService
  ){ }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.vacanteForm = new FormGroup({
      id_vacante: new FormControl(this.vacante.id_vacante, Validators.required),
      id_unidad_centro: new FormControl(this.vacante.id_unidad_centro, Validators.required),
      id_entidad: new FormControl(this.vacante.id_entidad, Validators.required),
      num_alumnos: new FormControl(this.vacante.num_alumnos, Validators.required),
      listado_alumnos: new FormControl(this.vacante.listado_alumnos)
    });
    this.getEntidades();
    this.getUnidadesCentro();
    this.getAlumnosNoSeleccionados(this.vacante.id_unidad_centro);
    this.getAlumnosSeleccionados(this.vacante.id_vacante);
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

  async getAlumnosSeleccionados(id_vacante: number){
    const RESPONSE = await this.servicioVacantes.getAlumnadoSeleccionado(id_vacante).toPromise();
    if (RESPONSE.ok){
      this.alumnosSeleccionados = RESPONSE.data as AlumnoVacante[];
    }
  }

  async getAlumnosNoSeleccionados(id_unidad_centro: number){
    const RESPONSE = await this.servicioVacantes.getAlumnadoNoSeleccionado(id_unidad_centro).toPromise();
    if (RESPONSE.ok){
      this.alumnosNoSeleccionados = RESPONSE.data as AlumnoVacante[];
    }
  }

  async confirmEdit(){
    if (this.vacanteForm.valid) {
      const vacanteForm = this.vacanteForm.value;

      const RESPONSE = await this.servicioVacantes.editVacante(vacanteForm).toPromise();
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
