import { UnidadCentro } from './../shared/interfaces/unidad-centro';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';
import { Alumno } from '../shared/interfaces/alumno';

const ENDPOINT = 'unidad_centro';

@Injectable({
  providedIn: 'root'
})
export class UnidadesCentrosService {

  unidadCentros: UnidadCentro[];
  unidadCentro: UnidadCentro;
  alumnado: Alumno[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setUnidadCentro(unidadCentro: UnidadCentro) {
    this.unidadCentro = unidadCentro;
  }

  setDatosBasicosUnidadCentro(formUnidadCentro: any) {
    this.unidadCentro.id_unidad_centro = formUnidadCentro.id_unidad_centro;
    this.unidadCentro.unidad_centro = formUnidadCentro.unidad_centro;
    this.unidadCentro.id_ciclo = formUnidadCentro.id_ciclo;
    this.unidadCentro.observaciones = formUnidadCentro.observaciones;
  }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllUnidadesCentros() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAlumnado(idUnidadesCentros: string[]) {
    const ROUTE = 'obtener_alumnos';
    const ID_UNIDADES_CENTROS = JSON.stringify(idUnidadesCentros);
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${ID_UNIDADES_CENTROS}&route=${ROUTE}`, { headers: this.commonService.headers });
  }

  addUnidadCentro(unidadCentro: UnidadCentro) {
    const body = JSON.stringify(unidadCentro);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editUnidadCentro(unidadCentro: UnidadCentro) {
    const body = JSON.stringify(unidadCentro);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteUnidadCentro(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
