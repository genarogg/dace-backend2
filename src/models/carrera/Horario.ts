import { DataTypes, Model } from "sequelize";
import sequelize from "@db";

class Horario extends Model {
  public id!: number;
  public dia!: string;
  public horaInicio!: string;
  public horaFin!: string;
  public materiaId!: number;
}

Horario.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    dia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horaInicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horaFin: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    aula: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "horarios",
    sequelize: sequelize,
  }
);

import { Materia } from "@models";

Horario.belongsTo(Materia, { foreignKey: "MateriaId" });

export default Horario;
