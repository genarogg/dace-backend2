"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _db_1 = __importDefault(require("@db"));
class Horario extends sequelize_1.Model {
}
Horario.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    dia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    horaInicio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    horaFin: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    aula: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "horarios",
    sequelize: _db_1.default,
});
const _models_1 = require("@models");
Horario.belongsTo(_models_1.Materia, { foreignKey: "MateriaId" });
exports.default = Horario;
