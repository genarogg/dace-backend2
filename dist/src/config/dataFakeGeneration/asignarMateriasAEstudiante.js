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
const asignarMateriasAEstudiante = () => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener todos los estudiantes
    const estudiantes = yield _models_1.Usuario.findAll({ where: { esEstudiante: true } });
    // Obtener todas las materias
    const materias = yield _models_1.Materia.findAll();
    for (let estudiante of estudiantes) {
        let ucTotal = 0;
        for (let materia of materias) {
            // Verificar si la materia ya tiene 15 estudiantes
            const count = yield _models_1.EstudianteMateria.count({
                where: { MateriaId: materia.id },
            });
            if (count >= 15) {
                continue;
            }
            // Si asignar esta materia haría que el estudiante exceda el límite de UC, continuar con la siguiente materia
            if (ucTotal + materia.uc > 21) {
                continue;
            }
            // Asignar la materia al estudiante
            yield _models_1.EstudianteMateria.create({
                UsuarioId: estudiante.id,
                MateriaId: materia.id,
                periodo: "2021-1",
            });
            // Actualizar el total de UC
            ucTotal += materia.uc;
        }
    }
    console.log("Materias asignadas exitosamente.");
});
exports.default = asignarMateriasAEstudiante;
