import { Injectable } from '@angular/core';
import { Alumno } from '../shared/interfaces/alumno';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'alumnado';

@Injectable({
  providedIn: 'root'
})
export class AlumnadoService {

  alumno: Alumno[];

  constructor(private http: HttpClient, private commonService: CommonService) { }
/*
  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }
*/
  getAlumnadoUnidadCentro(id_unidad_centro: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_unidad_centro=${id_unidad_centro}`, { headers: this.commonService.headers });
  }

  getAllAlumnado() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAlumnadoDisponibles(idReunion: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?reunion=${idReunion}`, { headers: this.commonService.headers });
  }

  // Marcada la Entidad de la DG a fuego como entidad=1
  getAllDinamizadores() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?entidad=1`, { headers: this.commonService.headers });
  }

  addAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteAlumno(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
