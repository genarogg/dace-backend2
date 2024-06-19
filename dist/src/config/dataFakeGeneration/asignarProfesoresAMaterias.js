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
const sequelize_1 = require("sequelize");
const _models_1 = require("@models");
const asignarProfesoresAMaterias = () => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener todos los profesores
    console.log("Asignando profesores a materias");
    const profesores = yield _models_1.Usuario.findAll({ where: { esProfesor: 1 } });
    // Para cada profesor
    for (const profesor of profesores) {
        // Obtener las materias que aún no tienen asignado este profesor
        const materiasAsignadas = yield _models_1.ProfesorMateria.findAll({
            where: { UsuarioId: profesor.id },
        });
        const idsMateriasAsignadas = materiasAsignadas.map((materia) => materia.MateriaId);
        // Obtener las materias que han sido asignadas a menos de 2 profesores
        const materiasAsignadasDosVeces = yield _models_1.ProfesorMateria.findAll({
            attributes: ["MateriaId"],
            group: ["MateriaId"],
            having: sequelize_1.Sequelize.literal("count(MateriaId) >= 2"),
        });
        const idsMateriasAsignadasDosVeces = materiasAsignadasDosVeces.map((materia) => materia.MateriaId);
        const materiasSinAsignar = yield _models_1.Materia.findAll({
            where: {
                id: {
                    [sequelize_1.Op.notIn]: [
                        ...idsMateriasAsignadas,
                        ...idsMateriasAsignadasDosVeces,
                    ],
                },
            },
        });
        // Asignar el profesor a las materias hasta que el profesor esté asignado a 2 materias
        // o no haya más materias disponibles
        for (let i = 0; i < Math.min(2, materiasSinAsignar.length); i++) {
            yield _models_1.ProfesorMateria.create({
                UsuarioId: profesor.id,
                MateriaId: materiasSinAsignar[i].id,
                CarreraId: 1,
                periodo: "2021-1",
            });
        }
    }
});
exports.default = asignarProfesoresAMaterias;
