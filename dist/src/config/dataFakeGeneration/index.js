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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const models_1 = require("../../models");
const populateCarreras_1 = __importDefault(require("./populateCarreras"));
const populateMaterias_1 = __importDefault(require("./populateMaterias"));
const papulateProfesor_1 = __importDefault(require("./papulateProfesor"));
const crearProfesorDemo_1 = __importDefault(require("./crearProfesorDemo"));
const asignarProfesoresAMaterias_1 = __importDefault(require("./asignarProfesoresAMaterias"));
const asignarHorariosAMaterias_1 = __importDefault(require("./asignarHorariosAMaterias"));
const crearEstudiantes_1 = __importDefault(require("./crearEstudiantes"));
const asignarMateriasAEstudiante_1 = __importDefault(require("./asignarMateriasAEstudiante"));
const crearAdmin_1 = __importDefault(require("./crearAdmin"));
const dataFakeGeneration = (cantidad, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioExistente = yield models_1.Usuario.findOne({
            where: { cedula: "27369469" },
        });
        console.log(chalk_1.default.cyan("Base de datos y tablas creadas"));
        if (usuarioExistente) {
            console.log(chalk_1.default.cyan("Data fake generada anteriormente"));
            return;
        }
        yield (0, populateCarreras_1.default)();
        yield (0, populateMaterias_1.default)();
        yield (0, crearProfesorDemo_1.default)();
        yield (0, papulateProfesor_1.default)(cantidad);
        yield (0, asignarProfesoresAMaterias_1.default)();
        yield (0, asignarHorariosAMaterias_1.default)();
        yield (0, crearEstudiantes_1.default)(cantidad * 5);
        yield (0, asignarMateriasAEstudiante_1.default)();
        yield (0, crearAdmin_1.default)();
        console.log(chalk_1.default.cyan("Data fake generada exitosamente"));
    }
    catch (error) {
        console.log(chalk_1.default.red("Error al generar data fake"), error);
    }
});
exports.default = dataFakeGeneration;
