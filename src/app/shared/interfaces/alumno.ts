export interface Alumno {
  id_alumnado: number;
	nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  id: string;
  id_unidad_centro: number;
  linkedin?: string;
	ingles?: string;
  minusvalia?: string;
	otro?: string;
  }

  export interface AlumnoVacante {
    id_alumnado: number;
    nombre: string;
    apellido: string;
    }
