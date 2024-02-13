import { UnidadCentro } from './../../shared/interfaces/unidad-centro';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, ENTIDAD_VACANTE, ERROR, INVALID_FORM } from '../../shared/messages';
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

  alumnosSeleccionados: AlumnoVacante[] =[];
  alumnosNoSeleccionados: AlumnoVacante[] =[];


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
      listado_alumnos: new FormControl(this.vacante.alumnos_admitidos)
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

  seleccionarAlumno(alumno: AlumnoVacante) {
    const numAlumnosPermitidos = this.vacanteForm.get('num_alumnos').value;
    if (this.alumnosSeleccionados.length >= numAlumnosPermitidos) {
        this.snackBar.open('El número máximo de alumnos ya ha sido alcanzado.', CLOSE, { duration: 3000 });
    } else {
        const indice = this.alumnosNoSeleccionados.indexOf(alumno);
        if (indice !== -1) {
            this.alumnosNoSeleccionados.splice(indice, 1); // Elimina al alumno de la lista de no seleccionados
            this.alumnosSeleccionados.push(alumno); // Agrega al alumno a la lista de seleccionados
        }
    }
}


  deSeleccionarAlumno(alumno: AlumnoVacante) {
    const indice = this.alumnosSeleccionados.indexOf(alumno);
    if (indice !== -1) {
        this.alumnosSeleccionados.splice(indice, 1); // Elimina al alumno de la lista de seleccionados
        this.alumnosNoSeleccionados.push(alumno); // Agrega al alumno a la lista de no seleccionados
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

      const idsAlumnos: number[] = this.alumnosSeleccionados.map(
        (alumno) => {
          return alumno.id_alumnado;
        }
      );

      const RESP = await this.servicioVacantes.editVacante(vacanteForm).toPromise();
      if (RESP.ok) {
        const RESP2 = await this.servicioVacantes
          .insertarAlumnosSeleccionados(vacanteForm.id_vacante, idsAlumnos)
          .toPromise();
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
      } else {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
