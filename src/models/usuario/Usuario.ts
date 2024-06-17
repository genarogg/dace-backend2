import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "@db";

import CarrerasDelUsuario from "./CarrerasDelUsuario";

class Usuario extends Model {
  //información de la cuenta
  public id!: number;
  public cedula!: number;
  public correo!: string;
  public contrasena!: string;
  public createdAt!: Date;
  public sede!: string;

  //información personal
  public nombre!: string;
  public segundoNombre!: string;
  public apellido!: string;
  public segundoApellido!: string;
  public genero!: string;
  public telefono!: string;
  public fechaDeNacimiento!: Date;
  public direccion!: string;
  public parroquia!: string;

  //roles
  public esEstudiante!: boolean;
  public esProfesor!: boolean;
  public esAdmin!: boolean;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segundoNombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    segundoApellido: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cedula: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fechaDeNacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING,
      //unique: true,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parroquia: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sede: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    esEstudiante: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    esProfesor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    esAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fechaDeCreacion: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "usuarios",
    sequelize: sequelize,
  }
);

// Establece la relación
Usuario.hasMany(CarrerasDelUsuario, {
  sourceKey: "id",
  foreignKey: "usuarioId",
  as: "carreras",
});

export default Usuario;
