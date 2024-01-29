import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Familia } from 'src/app/shared/interfaces/familia';
import { FamiliasService } from 'src/app/services/familias.service';
import { CLOSE, ENTIDAD_CENTRO, ENTIDAD_FAMILIA } from '../../shared/messages';
import { UnidadesCentrosService } from 'src/app/services/unidades-centros.service';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';

@Component({
  selector: 'app-delete-unidad-centros',
  templateUrl: './delete-unidad-centros.component.html'
})
export class DeleteUnidadCentrosComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteUnidadCentrosComponent>,
    @Inject(MAT_DIALOG_DATA) public centro: UnidadCentro,
    public servicioCentro: UnidadesCentrosService,
    public snackBar: MatSnackBar,
  )
  {   }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_CENTRO;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioCentro.deleteUnidadCentro(this.centro.id_unidad_centro).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
