import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnadoService } from 'src/app/services/alumnado.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { CLOSE, ENTIDAD_ALUMNO } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-alumno',
  templateUrl: './delete-alumno.component.html',
  styleUrls: ['./delete-alumno.component.scss']
})
export class DeleteAlumnoComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public alumno: Alumno,
    public servicioAlumno: AlumnadoService,
    public snackBar: MatSnackBar,
  )
  {   }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_ALUMNO;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioAlumno.deleteAlumno(this.alumno.id_alumnado).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
