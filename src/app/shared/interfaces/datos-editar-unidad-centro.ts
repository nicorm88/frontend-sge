import { Alumno } from './alumno';
import { UnidadCentro } from './unidad-centro';

export interface DatosEditarUnidadCentro {
    unidadCentro: UnidadCentro;
    alumnado: Alumno[];

}
