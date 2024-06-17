import { DataTypes, Model } from "sequelize";
import sequelize from "@db";

class ProfesorMateria extends Model {
  public UsuarioId!: number;
  public MateriaId!: number;

  public imprimirValores() {
    console.log("UsuarioId:", this.UsuarioId);
    console.log("MateriaId:", this.MateriaId);
  }
}

ProfesorMateria.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    UsuarioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    MateriaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    CarreraId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    periodo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ProfesorMateria",
    sequelize: sequelize,
    indexes: [
      {
        unique: true,
        fields: ["UsuarioId", "MateriaId"],
      },
    ],
  }
);

import { Usuario, Materia, Carrera } from "@models";

ProfesorMateria.belongsTo(Usuario, { foreignKey: "UsuarioId" });
ProfesorMateria.belongsTo(Carrera, { foreignKey: "CarreraId" });
ProfesorMateria.belongsTo(Materia, { foreignKey: "MateriaId" });

export default ProfesorMateria;
