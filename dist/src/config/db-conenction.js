"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const chalk_1 = __importDefault(require("chalk"));
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    /* storage: ":memory:", */
    storage: "./src/config/db.sqlite",
    logging: false,
});
sequelize
    .sync()
    .then(() => console.log(chalk_1.default.cyan("Base de datos y tablas creadas")))
    .catch((error) => console.error(chalk_1.default.red("Error al sincronizar:", error)));
exports.default = sequelize;
