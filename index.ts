// Limpia la consola
import clear from "console-clear";
clear();

import express, { Request, Response } from "express";

import chalk from "chalk";
import cors from "cors";

// Importar variables de entorno
import dotenv from "dotenv";
dotenv.config();

const { PORT: PORT_ENV, CORS_URL } = process.env;

// variables de entorno
const PORT = PORT_ENV || 3000;

// Crear una instancia de express
const app = express();

// Usa cors como middleware
app.use(cors({ origin: CORS_URL }));

// Configurar el directorio public
app.use(express.static("./src/public"));

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conexión a la base de datos
import sequelize from "@db";

sequelize.sync({ logging: false }).then(() => {
  console.log(chalk.cyan("db conectada!"));
});

// Importar rutas
import { inicioRouter, registroRouter } from "@router";

app.use("/", inicioRouter);
app.use("/auth", registroRouter);

// Middleware de manejo de errores
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});

app.listen(PORT, () => {
  console.log(
    chalk.green.bold(`El servidor esta corriendo http://localhost:${PORT}`)
  );
});
