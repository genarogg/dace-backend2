"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _models_1 = require("@models");
class UsuarioFn {
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _models_1.Usuario.findByPk(id);
        });
    }
    //busca las materias del profesor
    buscarMateriasConProfesor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profesor = yield _models_1.Usuario.findByPk(id);
            const profesorMaterias = yield _models_1.ProfesorMateria.findAll({
                where: { UsuarioId: id },
            });
            const materiasProfesor = yield Promise.all(profesorMaterias.map((profesorMateria) => __awaiter(this, void 0, void 0, function* () {
                const materia = yield _models_1.Materia.findByPk(profesorMateria.MateriaId);
                return { profesor, materia };
            })));
            return materiasProfesor;
        });
    }
    //busca el horario del profesor
    buscarHorarioDelUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profesorData = yield this.buscarMateriasConProfesor(id);
            const horarios = [];
            for (const obj of profesorData) {
                // Extrae el id de la materia
                if (obj.materia !== null) {
                    const materiaId = obj.materia.id;
                    // Busca el horario correspondiente en la base de datos
                    const horario = yield _models_1.Horario.findAll({
                        where: { MateriaId: materiaId },
                    });
                    if (!horario) {
                        throw new Error("Horario no encontrado");
                    }
                    horarios.push(horario);
                }
            }
            const combinarProfesorDataYHorarios = (profesorData, horarios) => {
                // Aplana el array de arrays de horarios en un solo array
                const horariosAplanados = horarios.flat();
                return profesorData.map((data) => {
                    const horariosMateria = horariosAplanados.filter((horario) => horario.MateriaId === data.materia.id);
                    return Object.assign(Object.assign({}, data), { horarios: horariosMateria.length > 0 ? horariosMateria : null });
                });
            };
            const resultado = combinarProfesorDataYHorarios(profesorData, horarios);
            return resultado;
        });
    }
    //busca las materias del estudiantes
    buscarMateriasDelEstudiante(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estudianteMaterias = yield _models_1.EstudianteMateria.findAll({
                where: { UsuarioId: id },
            });
            return estudianteMaterias;
        });
    }
    // buscar Materias Con Profesor Y Estudiantes
    buscarMateriasConProfesorYEstudiantes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profesor = yield _models_1.Usuario.findByPk(id);
            if (!profesor) {
                throw new Error("Profesor no encontrado");
            }
            const profesorMaterias = yield _models_1.ProfesorMateria.findAll({
                where: { UsuarioId: id },
            });
            const materiasProfesor = yield Promise.all(profesorMaterias.map((profesorMateria) => __awaiter(this, void 0, void 0, function* () {
                const materia = yield _models_1.Materia.findByPk(profesorMateria.MateriaId);
                if (!materia) {
                    throw new Error("Materia no encontrado");
                }
                const estudiantesInscritos = yield _models_1.EstudianteMateria.findAll({
                    where: { MateriaId: profesorMateria.MateriaId },
                    include: _models_1.Usuario,
                });
                const data = {
                    materia: {
                        nombre: materia.nombre,
                        id: materia.id,
                        uc: materia.uc,
                        seccion: materia.seccion,
                    },
                    profesor: {
                        id: profesor.id,
                        nombre: profesor.nombre,
                        segundoNombre: profesor.segundoNombre,
                        apellido: profesor.apellido,
                        segundoApellido: profesor.segundoApellido,
                        cedula: profesor.cedula,
                    },
                    estudiantesInscritos: estudiantesInscritos.map((estudiante) => ({
                        id: estudiante.Usuario.id,
                        nombre: estudiante.Usuario.nombre,
                        segundoNombre: estudiante.Usuario.segundoNombre,
                        apellido: estudiante.Usuario.apellido,
                        segundoApellido: estudiante.Usuario.segundoApellido,
                        cedula: estudiante.Usuario.cedula,
                        nota: estudiante.nota,
                    })),
                };
                return data;
            })));
            return materiasProfesor;
        });
    }
}
exports.default = new UsuarioFn();
