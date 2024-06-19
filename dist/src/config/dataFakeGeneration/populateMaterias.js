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
const info_1 = require("./info");
const populateMaterias = () => __awaiter(void 0, void 0, void 0, function* () {
    const materiasData = (0, info_1.materias)();
    const materiasTransformadas = [];
    for (const carrera of Object.values(materiasData)) {
        for (const [semestre, materias] of Object.entries(carrera.IngenieriaInformatica)) {
            for (const [nombre, materia] of Object.entries(materias)) {
                materiasTransformadas.push({
                    nombre: nombre,
                    codigo: materia.codigo,
                    horasTeoricas: materia.horasTeoricas,
                    horasPracticas: materia.horasPracticas,
                    horasSemanales: materia.horasSemanales,
                    uc: materia.uc,
                    prelaciones: materia.prelaciones,
                    semestre: parseInt(semestre.split(" ")[1]), // Asume que el semestre siempre está en el formato "Semestre X"
                    seccion: (Math.floor(Math.random() * 5) + 1).toString(),
                });
            }
        }
    }
    for (let materia of materiasTransformadas) {
        // Verifica si la materia ya existe en la base de datos
        const existingMateria = yield _models_1.Materia.findOne({
            where: { codigo: materia.codigo },
        });
        // Si la materia no existe, entonces la inserta
        if (!existingMateria) {
            yield _models_1.Materia.create(materia)
                .then(() => {
                /* console.log(`Materia ${materia.nombre} creada exitosamente`) */
            })
                .catch((error) => console.error(`Error al crear la materia ${materia.nombre}:`, error));
        }
    }
});
exports.default = populateMaterias;
