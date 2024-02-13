import { Alumno } from "./alumno";

export interface Vacante {
  id_vacante: number;
  id_entidad: number;
  id_unidad_centro: number;
  num_alumnos: number;
  unidad_centro?: string;
  entidad?: string;
  alumnos_admitidos?: string;
}
