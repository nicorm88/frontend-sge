import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vacante } from '../shared/interfaces/vacante';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { VacanteService } from '../services/vacantes.service';
import { AddVacanteComponent } from './add-vacante/add-vacante.component';
import { DeleteVacanteComponent } from './delete-vacante/delete-vacante.component';
import { EditVacanteComponent } from './edit-vacante/edit-vacante.component';
import { AlumnoVacante } from '../shared/interfaces/alumno';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html'
})
export class VacantesComponent{

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Vacante> = new MatTableDataSource();

  idVacanteFilter = new FormControl();
  idEntidadFilter = new FormControl();
  idUnidadCentroFilter = new FormControl();
  numAlumnadoFilter = new FormControl();

  alumnosSeleccionados: number[] =[];
  alumnosNoSeleccionados: number[] =[];

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_vacante: '', id_entidad: '', id_unidad_centro: '', num_alumnos: ''};
  servicioVacantes: any;
  vacante: any;

  constructor(
    public dialog: MatDialog,
    private vacanteService: VacanteService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getVacantes();
  }

  async getVacantes() {
    const RESPONSE = await this.vacanteService.getAllVacantes().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.vacanteService.vacantes = RESPONSE.data as Vacante[];
      this.displayedColumns = ['id_vacante', 'id_entidad', 'id_unidad_centro', 'num_alumnos','alumnos_admitidos', 'actions'];
      this.dataSource.data = this.vacanteService.vacantes;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }
  }

  async addVacante() {
    const dialogRef = this.dialog.open(AddVacanteComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.unidadDual.push(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async editVacante(vacante: Vacante) {
    const dialogRef = this.dialog.open(EditVacanteComponent, { data: vacante, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.editUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  async deleteVacante(vacante: Vacante) {
    const dialogRef = this.dialog.open(DeleteVacanteComponent, { data: vacante, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.deleteUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (vacante: Vacante, filter: string) => boolean {
    const filterFunction = (vacante: Vacante, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return vacante.id_vacante.toString().indexOf(searchTerms.id_vacante) !== -1
        && vacante.id_entidad.toString().indexOf(searchTerms.id_entidad.toLowerCase()) !== -1
        && vacante.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro.toLowerCase()) !== -1
    };

    return filterFunction;
  }

  onChanges() {
      this.idUnidadCentroFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_unidad_centro = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      // this.unidadCentroFilter.valueChanges
      // .subscribe(value => {
      //     this.filterValues.unidad_centro = value;
      //     this.dataSource.filter = JSON.stringify(this.filterValues);
      // });

      // this.observacionesFilter.valueChanges
      // .subscribe(value => {
      //     this.filterValues.observaciones = value;
      //     this.dataSource.filter = JSON.stringify(this.filterValues);
      // });
  }

  async getAlumnosSeleccionados(id_vacante: number){
    const RESPONSE = await this.servicioVacantes.getAlumnadoSeleccionado(id_vacante).toPromise();
    if (RESPONSE.ok){
      let alumnos = RESPONSE.data as AlumnoVacante[];
      this.alumnosSeleccionados.push(alumnos.length)
    }
  }

  async getAlumnosNoSeleccionados(id_unidad_centro: number){
    const RESPONSE = await this.servicioVacantes.getAlumnadoNoSeleccionado(id_unidad_centro).toPromise();
    if (RESPONSE.ok){
      let alumnos = RESPONSE.data as AlumnoVacante[];
      this.alumnosNoSeleccionados.push(alumnos.length)
    }
  }

}
