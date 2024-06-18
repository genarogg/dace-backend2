// archivo para importar todos los modelos

import Usuario from "./usuario/Usuario";
import CarrerasDelUsuario from "./usuario/CarrerasDelUsuario";

import Carrera from "./carrera/Carrera";
import Materia from "./carrera/Materia";

import ProfesorMateria from "./usuario/relacion/ProfesorMateria";
import Horario from "./carrera/Horario";

import EstudianteMateria from "./usuario/relacion/EstudianteMateria";

import UsuarioFn from "./usuario/fn/UsuarioFn";

export {
  Usuario,
  CarrerasDelUsuario,
  Carrera,
  Materia,
  ProfesorMateria,
  Horario,
  EstudianteMateria,
  UsuarioFn
};
