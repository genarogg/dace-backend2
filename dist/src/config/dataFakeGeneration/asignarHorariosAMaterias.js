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
const asignarHorariosAMaterias = () => __awaiter(void 0, void 0, void 0, function* () {
    // Definir los días y las horas de inicio posibles
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const horasInicio = ["08:00", "10:00", "12:00", "14:00"];
    // Obtener todas las materias
    const materias = yield _models_1.Materia.findAll();
    for (let materia of materias) {
        // Asignar dos horarios a cada materia
        for (let i = 0; i < 2; i++) {
            // Seleccionar un día y una hora de inicio al azar
            const dia = dias[Math.floor(Math.random() * dias.length)];
            const horaInicio = horasInicio[Math.floor(Math.random() * horasInicio.length)];
            // Calcular la hora de fin (2 horas después de la hora de inicio)
            const horaFin = (parseInt(horaInicio.split(":")[0]) + 2).toString().padStart(2, "0") +
                ":00";
            // Asignar el horario a la materia
            yield _models_1.Horario.create({
                dia: dia,
                horaInicio: horaInicio,
                horaFin: horaFin,
                MateriaId: materia.id,
                aula: (Math.floor(Math.random() * 15) + 1).toString(),
            });
        }
    }
    console.log("Horarios asignados exitosamente.");
});
exports.default = asignarHorariosAMaterias;
