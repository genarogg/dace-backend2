"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _db_1 = __importDefault(require("@db"));
class ProfesorMateria extends sequelize_1.Model {
    imprimirValores() {
        console.log("UsuarioId:", this.UsuarioId);
        console.log("MateriaId:", this.MateriaId);
    }
}
ProfesorMateria.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    periodo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "ProfesorMateria",
    sequelize: _db_1.default,
});
const _models_1 = require("@models");
ProfesorMateria.belongsTo(_models_1.Usuario, { foreignKey: "UsuarioId" });
ProfesorMateria.belongsTo(_models_1.Carrera, { foreignKey: "CarreraId" });
ProfesorMateria.belongsTo(_models_1.Materia, { foreignKey: "MateriaId" });
exports.default = ProfesorMateria;
