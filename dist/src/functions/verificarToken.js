"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verificarToken = (token) => {
    const JWTSECRETO = process.env.JWTSECRETO || "jwt-secret";
    if (!token) {
        console.error("Token no proporcionado");
        return null;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWTSECRETO);
        if (!payload || !payload.id) {
            console.error("El token no contiene un id de usuario válido");
            return null;
        }
        const usuario = {
            id: payload.id,
        };
        return usuario;
    }
    catch (err) {
        console.error("Error al verificar el token:", err);
        return null;
    }
};
exports.default = verificarToken;
