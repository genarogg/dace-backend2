"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBitacora = exports.consultarHorario = exports.updateUser = exports.dataUserGet = void 0;
const dataUserGet_1 = __importDefault(require("./usuario/dataUserGet"));
exports.dataUserGet = dataUserGet_1.default;
const updateUser_1 = __importDefault(require("./usuario/updateUser"));
exports.updateUser = updateUser_1.default;
const consurtarHorario_1 = __importDefault(require("./usuario/consurtarHorario"));
exports.consultarHorario = consurtarHorario_1.default;
const getBitacora_1 = __importDefault(require("./usuario/getBitacora"));
exports.getBitacora = getBitacora_1.default;
