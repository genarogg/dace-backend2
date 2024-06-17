import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "@db";

class CarrerasDelUsuario extends Model {
  public id!: number;
  public nombreCarrera!: string;
  public createdAt!: Date;
  public usuarioId!: number; // Clave foránea
}

CarrerasDelUsuario.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreCarrera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    usuarioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "CarrerasDelUsuario",
    sequelize: sequelize,
  }
);

export default CarrerasDelUsuario;
