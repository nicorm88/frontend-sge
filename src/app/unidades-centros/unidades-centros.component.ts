import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';

import { UnidadesCentrosService } from '../services/unidades-centros.service';

import { AddUnidadCentrosComponent } from './add-unidad-centro/add-unidad-centros.component';
import { EditUnidadCentrosComponent } from './edit-unidad-centro/edit-unidad-centros.component';
import { DeleteUnidadCentrosComponent } from './delete-unidad-centro/delete-unidad-centros.component';
import { UnidadCentro } from '../shared/interfaces/unidad-centro';
import { DatosUnidadCentroComponent } from './datos-unidad-centro/datos-unidad-centro.component';
import { AlumnadoService } from '../services/alumnado.service';
import { Alumno } from '../shared/interfaces/alumno';

@Component({
  selector: 'app-unidades-centros',
  templateUrl: './unidades-centros.component.html'
})
export class UnidadesCentrosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<UnidadCentro> = new MatTableDataSource();

  idUnidadCentroFilter = new FormControl();
  unidadCentroFilter = new FormControl();
  idCicloFilter = new FormControl();
  observacionesFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_unidad_centro: '', unidad_centro: '', id_ciclo: '', observaciones: ''};

  constructor(
    public dialog: MatDialog,
    private unidadesCentrosService: UnidadesCentrosService,
    private alumnadoService: AlumnadoService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getUnidadesCentros();
    //this.unidadesDualService.ENTIDAD = "test";
  }

  async datosUnidad(unidadCentro: UnidadCentro) {
    const UNIDADCENTRO = unidadCentro;
    const ALUMNADO = await this.getAlumnado(unidadCentro.id_unidad_centro);

    if (UNIDADCENTRO) {
      const dialogRef = this.dialog.open(DatosUnidadCentroComponent, {
        width: '70em',
        maxWidth: '70em',
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        disableClose: true,
        data: {
          unidadCentro: UNIDADCENTRO,
          alumnado: ALUMNADO
        }
      });

      const RESULT = await dialogRef.afterClosed().toPromise();
      await this.getUnidadesCentros();
      /*
      let var_reunion;
      var_reunion = this.originalDatasource.filter(reunion => {
        return reunion.id_reunion === RESULT.reunion.id_reunion;
      });
      */
      //this.ngOnInit();
      //this.selection = new SelectionModel<PublicacionDHL>(false, [publicacio[0]]);
      //this.fiterEstados();

      //this.selection = new SelectionModel<Reunion>(false, [publicacio[0]]);

    }
  }

  async getAlumnado(id_unidad_centro: number){
    const RESPONSE = await this.alumnadoService.getAlumnadoUnidadCentro(id_unidad_centro).toPromise();
    if (RESPONSE.ok){
      return RESPONSE.data as Alumno[];
    }
  }


  async getUnidadesCentros() {
    const RESPONSE = await this.unidadesCentrosService.getAllUnidadesCentros().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.unidadesCentrosService.unidadCentros = RESPONSE.data as UnidadCentro[];
      this.displayedColumns = ['id_unidad_centro', 'unidad_centro', 'id_ciclo', 'observaciones', 'actions'];
      this.dataSource.data = this.unidadesCentrosService.unidadCentros;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }
  }

  async addUnidadCentro() {
    const dialogRef = this.dialog.open(AddUnidadCentrosComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.unidadDual.push(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async editUnidadCentro(unidadCentro: UnidadCentro) {
    const dialogRef = this.dialog.open(EditUnidadCentrosComponent, { data: unidadCentro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.editUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async deleteUnidadCentro(unidadCentro: UnidadCentro) {
    const dialogRef = this.dialog.open(DeleteUnidadCentrosComponent, { data: unidadCentro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.deleteUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (unidadCentro: UnidadCentro, filter: string) => boolean {
    const filterFunction = (unidadCentro: UnidadCentro, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      if(unidadCentro.observaciones!=null){
        return unidadCentro.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1
          && unidadCentro.unidad_centro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1
          && unidadCentro.observaciones.toLowerCase().indexOf(searchTerms.observaciones.toLowerCase()) !== -1;
      }else{
        unidadCentro.observaciones=""
        return unidadCentro.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1
        && unidadCentro.unidad_centro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1
        && unidadCentro.observaciones.toLowerCase().indexOf(searchTerms.observaciones.toLowerCase()) !== -1
      }
    };

    return filterFunction;
  }

  onChanges() {
      this.idUnidadCentroFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_unidad_centro = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.unidadCentroFilter.valueChanges
      .subscribe(value => {
          this.filterValues.unidad_centro = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.observacionesFilter.valueChanges
      .subscribe(value => {
          this.filterValues.observaciones = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  }
}
