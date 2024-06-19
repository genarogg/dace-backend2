"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _db_1 = __importDefault(require("@db"));
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    segundoNombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    segundoApellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cedula: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    genero: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fechaDeNacimiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        //unique: true,
        allowNull: true,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    parroquia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    sede: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "active",
    },
    esEstudiante: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    esProfesor: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    esAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    fechaDeCreacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    /* carrera: {
      type: DataTypes.STRING,
      allowNull: true,
    }, */
}, {
    tableName: "usuarios",
    sequelize: _db_1.default,
});
exports.default = Usuario;
