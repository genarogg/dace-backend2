"use strict";
// archivo para importar todos los modelos
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitacoraLogin = exports.UsuarioFn = exports.EstudianteMateria = exports.Horario = exports.ProfesorMateria = exports.Materia = exports.Carrera = exports.CarrerasDelUsuario = exports.Usuario = void 0;
const Usuario_1 = __importDefault(require("./usuario/Usuario"));
exports.Usuario = Usuario_1.default;
const CarrerasDelUsuario_1 = __importDefault(require("./usuario/CarrerasDelUsuario"));
exports.CarrerasDelUsuario = CarrerasDelUsuario_1.default;
const Carrera_1 = __importDefault(require("./carrera/Carrera"));
exports.Carrera = Carrera_1.default;
const Materia_1 = __importDefault(require("./carrera/Materia"));
exports.Materia = Materia_1.default;
const ProfesorMateria_1 = __importDefault(require("./usuario/relacion/ProfesorMateria"));
exports.ProfesorMateria = ProfesorMateria_1.default;
const Horario_1 = __importDefault(require("./carrera/Horario"));
exports.Horario = Horario_1.default;
const EstudianteMateria_1 = __importDefault(require("./usuario/relacion/EstudianteMateria"));
exports.EstudianteMateria = EstudianteMateria_1.default;
const UsuarioFn_1 = __importDefault(require("./usuario/fn/UsuarioFn"));
exports.UsuarioFn = UsuarioFn_1.default;
const BitacoraLogin_1 = __importDefault(require("./bitacora/BitacoraLogin"));
exports.BitacoraLogin = BitacoraLogin_1.default;
