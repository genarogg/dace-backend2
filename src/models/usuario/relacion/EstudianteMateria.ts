import { Model, DataTypes } from "sequelize";
import sequelize from "@db";

class EstudianteMateria extends Model {
  public id!: number;
  public usuarioId!: number;
  public materiaId!: number;
}

EstudianteMateria.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    nota: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    periodo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "EstudianteMateria",
    timestamps: false,
  }
);

import { Usuario, Materia } from "@models";

EstudianteMateria.belongsTo(Usuario, { foreignKey: "UsuarioId" });
EstudianteMateria.belongsTo(Materia, { foreignKey: "MateriaId" });

export default EstudianteMateria;
