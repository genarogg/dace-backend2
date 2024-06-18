import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "@db";

class BitacoraLogin extends Model {
  public id!: number;
  public usuarioId!: number;
  public fecha!: Date;
  public ip!: string;
  public userAgent!: string;
}

BitacoraLogin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    fecha: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },

    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "bitacora_login",
    sequelize,
  }
);

export default BitacoraLogin;
