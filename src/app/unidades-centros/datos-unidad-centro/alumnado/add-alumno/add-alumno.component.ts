import { Alumno } from 'src/app/shared/interfaces/alumno';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, INVALID_FORM, ENTIDAD_ALUMNO } from 'src/app/shared/messages';
import { UnidadesCentrosService } from 'src/app/services/unidades-centros.service';
import { AlumnadoService } from 'src/app/services/alumnado.service';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {
  alumnoForm: FormGroup;
  unidadesCentro: UnidadCentro[];

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddAlumnoComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumnado: AlumnadoService,
    private servicioUnidadCentro: UnidadesCentrosService,

  ){ }

  ngOnInit(): void {
    this.alumnoForm = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      fecha_nacimiento: new FormControl(null, [Validators.required, Validators.email]),
      linkedin: new FormControl(null),
      ingles: new FormControl(null),
      minusvalia: new FormControl(null),
      otro: new FormControl(null),
      id: new FormControl(null, Validators.required),
      id_unidad_centro: new FormControl(null, Validators.required)
    });
    this.ENTIDAD = ENTIDAD_ALUMNO;


    this.getUnidadesCentro();

  }



  async confirmAdd() {
    if (this.alumnoForm.valid) {
      const alumno = this.alumnoForm.value as Alumno;

      const RESPONSE = await this.servicioAlumnado.addAlumno(alumno).toPromise();
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

  async getUnidadesCentro(){
    const RESPONSE = await this.servicioUnidadCentro.getAllUnidadesCentros().toPromise();
    if (RESPONSE.ok){
      this.unidadesCentro = RESPONSE.data as UnidadCentro[];
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }

}
