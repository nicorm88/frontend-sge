import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from 'src/app/shared/interfaces/api-response';

import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { AlumnadoService } from '../../../services/alumnado.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { UnidadCentro } from 'src/app/shared/interfaces/unidad-centro';
import { UnidadesCentrosService } from 'src/app/services/unidades-centros.service';

@Component({
  selector: 'app-alumnado',
  templateUrl: './alumnado.component.html',
  styleUrls: ['./alumnado.component.scss']
})
export class AlumnadoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource();

  idAlumnoFilter = new FormControl();
  nombreCompletoFilter = new FormControl();
  fechaNacimientoFilter = new FormControl();
  unidad_centro: UnidadCentro;

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_alumnado: '', nombre: '',apellido: '', fecha_nacimiento: '', id_unidad_centro: ''};

  constructor(
    public dialog: MatDialog,
    private alumnadoService: AlumnadoService,
    private overlay: Overlay,

    public unidadesCentroService: UnidadesCentrosService
  ) { }

  ngOnInit(): void {
    this.unidad_centro = this.unidadesCentroService.unidadCentro;
    this.getAlumnadoUnidadCentro(this.unidad_centro);
    //this.createFilter();
    //this.onChanges();
  }


  async getAlumnadoUnidadCentro(unidad_centro: UnidadCentro) {
    const RESPONSE = await this.alumnadoService.getAlumnadoUnidadCentro(unidad_centro.id_unidad_centro).toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.alumnadoService.alumno = RESPONSE.data as Alumno[];
      this.displayedColumns = ['id_alumnado','nombre', 'apellido', 'fecha_nacimiento', 'id_unidad_centro', 'actions'];
      this.dataSource.data = this.alumnadoService.alumno;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }
  }

  async addAlumno(id_unidad_centro: number) {
    const dialogRef = this.dialog.open(AddAlumnoComponent, { data: id_unidad_centro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }
  }

  async editAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(EditAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }
  }

  async deleteAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(DeleteAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.dataSource.data = this.alumnadoService.alumno;
        this.getAlumnadoUnidadCentro(this.unidad_centro);
      }
    }
  }


  createFilter(): (alumno: Alumno, filter: string) => boolean {
    const filterFunction = (alumno: Alumno, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return alumno.id_alumnado.toString().indexOf(searchTerms.id_alumnado) !== -1
        && alumno.nombre.toLowerCase().indexOf(searchTerms.nombre.toLowerCase()) !== -1
        && alumno.apellido.toLowerCase().indexOf(searchTerms.apellido.toLowerCase()) !== -1;
        // TODO Arreglar esto
    };

    return filterFunction;
  }

  onChanges() {
     this.idAlumnoFilter.valueChanges.subscribe(value => {
        this.filterValues.id_alumnado = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.nombreCompletoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.nombre = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.fechaNacimientoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fecha_nacimiento = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });


  }

}
