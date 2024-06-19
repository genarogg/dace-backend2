"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarTokenPost = exports.loginPost = exports.registroPost = void 0;
const registro_1 = require("./auth/registro");
Object.defineProperty(exports, "registroPost", { enumerable: true, get: function () { return registro_1.registroPost; } });
const login_1 = require("./auth/login");
Object.defineProperty(exports, "loginPost", { enumerable: true, get: function () { return login_1.loginPost; } });
const verificarToken_1 = __importDefault(require("./auth/verificarToken"));
exports.verificarTokenPost = verificarToken_1.default;
