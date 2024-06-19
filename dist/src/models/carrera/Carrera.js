"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _db_1 = __importDefault(require("@db"));
class Carrera extends sequelize_1.Model {
}
Carrera.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    pensumCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    semestral: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    anual: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    creditosTotales: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    facultad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "carrera",
    sequelize: _db_1.default,
});
exports.default = Carrera;
