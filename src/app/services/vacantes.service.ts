import { UnidadCentro } from './../shared/interfaces/unidad-centro';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';
import { Vacante } from '../shared/interfaces/vacante';

const ENDPOINT = 'vacantes';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  vacante: Vacante;
  vacantes: Vacante[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setVacante(vacante: Vacante) {
    this.vacante = vacante;
  }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllVacantes() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAlumnadoNoSeleccionado(id_unidad_centro: number) {
    const ROUTE = 'obtener_alumnos_no_seleccionado';
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id_unidad_centro}&route=${ROUTE}`, { headers: this.commonService.headers });
  }

  getAlumnadoSeleccionado(id_vacante: number) {
    const ROUTE = 'obtener_alumnos_seleccionado';
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id_vacante}&route=${ROUTE}`, { headers: this.commonService.headers });
  }

  addVacante(vacante: Vacante) {
    const body = JSON.stringify(vacante);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editVacante(vacante: Vacante) {
    const body = JSON.stringify(vacante);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteVacante(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
