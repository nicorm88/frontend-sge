import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { AlumnadoService } from 'src/app/services/alumnado.service';
import { CLOSE, ENTIDAD_ALUMNO, ERROR } from 'src/app/shared/messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { UnidadesCentrosService } from 'src/app/services/unidades-centros.service';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.scss']
})
export class EditAlumnoComponent implements OnInit {

  alumnoForm: FormGroup;
  unidadesCentro: UnidadCentro[];

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumnos: AlumnadoService,
    @Inject(MAT_DIALOG_DATA) public alumno: Alumno,
    private servicioUnidadCentro: UnidadesCentrosService

  ) { }

  ngOnInit(): void {
    this.setForm();
    //this.setFilter();
  }

  setForm() {
    this.ENTIDAD = ENTIDAD_ALUMNO;
    this.alumnoForm = new FormGroup({
      id_alumnado: new FormControl(this.alumno.id_alumnado),
      nombre: new FormControl(this.alumno.nombre),
      apellido: new FormControl(this.alumno.apellido, Validators.required),
      fecha_nacimiento: new FormControl(this.alumno.fecha_nacimiento, Validators.required),
      linkedin: new FormControl(this.alumno.linkedin),
      ingles: new FormControl(this.alumno.ingles),
      minusvalia: new FormControl(this.alumno.minusvalia),
      otro: new FormControl(this.alumno.otro),
      id: new FormControl(this.alumno.id, Validators.required),
      id_unidad_centro: new FormControl(this.alumno.id_unidad_centro, Validators.required)
    });
    this.getUnidadesCentro()
  }
  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  async confirmEdit(){
    console.log(this.alumno);
    if (this.alumnoForm.valid) {
      const alumnoForm = this.alumnoForm.value;

      const RESPONSE = await this.servicioAlumnos.editAlumno(alumnoForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  }

  async getUnidadesCentro(){
    const RESPONSE = await this.servicioUnidadCentro.getAllUnidadesCentros().toPromise();
    if (RESPONSE.ok){
      this.unidadesCentro = RESPONSE.data as UnidadCentro[];
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

}


