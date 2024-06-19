"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notasRouter = exports.usuarioRouter = exports.authRouter = exports.inicioRouter = void 0;
const inicio_1 = __importDefault(require("./inicio"));
exports.inicioRouter = inicio_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.authRouter = auth_1.default;
const usuario_1 = __importDefault(require("./usuario"));
exports.usuarioRouter = usuario_1.default;
const notas_1 = __importDefault(require("./notas"));
exports.notasRouter = notas_1.default;
