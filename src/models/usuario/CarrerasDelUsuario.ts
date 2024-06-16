import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "@db";

class CarrerasDelUsuario extends Model {
  public id!: number;
  public nombre!: string;
  public createdAt!: Date;
}

CarrerasDelUsuario.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "CarrerasDelUsuarios",
    sequelize: sequelize,
  }
);

export default CarrerasDelUsuario;
