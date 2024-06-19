"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _db_1 = __importDefault(require("@db"));
class EstudianteMateria extends sequelize_1.Model {
}
EstudianteMateria.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nota: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    periodo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: _db_1.default,
    tableName: "EstudianteMateria",
    timestamps: false,
});
const _models_1 = require("@models");
EstudianteMateria.belongsTo(_models_1.Usuario, { foreignKey: "UsuarioId" });
EstudianteMateria.belongsTo(_models_1.Materia, { foreignKey: "MateriaId" });
exports.default = EstudianteMateria;
