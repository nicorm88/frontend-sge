import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, ENTIDAD_VACANTE } from '../../shared/messages';
import { VacanteService } from 'src/app/services/vacantes.service';
import { Vacante } from 'src/app/shared/interfaces/vacante';

@Component({
  selector: 'app-delete-vacante',
  templateUrl: './delete-vacante.component.html'
})
export class DeleteVacanteComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteVacanteComponent>,
    @Inject(MAT_DIALOG_DATA) public vacante: Vacante,
    public servicioVacante: VacanteService,
    public snackBar: MatSnackBar,
  )
  {   }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_VACANTE;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioVacante.deleteVacante(this.vacante.id_vacante).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
