"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _db_1 = __importDefault(require("@db"));
class Materia extends sequelize_1.Model {
}
Materia.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    horasTeoricas: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    horasPracticas: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    horasSemanales: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    uc: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    prelaciones: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    semestre: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    seccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "seccion unica",
    },
}, {
    tableName: "materias",
    sequelize: _db_1.default,
});
exports.default = Materia;
