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
const populateCarreras = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carrerasData = (0, info_1.carreras)();
        //@ts-ignore
        const carrerasToInsert = Object.values(carrerasData[0]);
        for (const carrera of carrerasToInsert) {
            // Verifica si la carrera ya existe en la base de datos
            const existingCarrera = yield _models_1.Carrera.findOne({
                where: { nombre: carrera.nombre },
            });
            // Si la carrera no existe, entonces la inserta
            if (!existingCarrera) {
                yield _models_1.Carrera.create(carrera)
                    .then(() => { })
                    .catch((error) => console.error(`Error al crear la carrera ${carrera.nombre}:`, error));
            }
        }
    }
    catch (error) {
        console.error("Error al obtener los datos:", error);
    }
});
exports.default = populateCarreras;
