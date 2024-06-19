"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Limpia la consola
const console_clear_1 = __importDefault(require("console-clear"));
(0, console_clear_1.default)();
const express_1 = __importDefault(require("express"));
const dataFakeGeneration_1 = __importDefault(require("./src/config/dataFakeGeneration"));
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
// Importar variables de entorno
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT: PORT_ENV, CORS_URL, NODE_ENV } = process.env;
// variables de entorno
const PORT = PORT_ENV || 3000;
// Crear una instancia de express
const app = (0, express_1.default)();
// Usa cors como middleware
app.use((0, cors_1.default)({ origin: CORS_URL }));
// Configurar el directorio public
app.use(express_1.default.static("./src/public"));
// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", "./src/views");
// Middleware para analizar el cuerpo de las solicitudes
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Conexión a la base de datos
const _db_1 = __importDefault(require("@db"));
_db_1.default.sync({ logging: false }).then(() => {
    console.log(chalk_1.default.cyan("db conectada!"));
});
// Importar rutas
const _router_1 = require("@router");
app.use("/", _router_1.inicioRouter);
app.use("/auth", _router_1.authRouter);
app.use("/user", _router_1.usuarioRouter);
app.use("/notas", _router_1.notasRouter);
// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("¡Algo salió mal!");
});
app.listen(PORT, () => {
    console.log(chalk_1.default.green.bold(`El servidor esta corriendo http://localhost:${PORT}`));
    //Generando datos falsos
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!NODE_ENV) {
            console.log("No se puede ejecutar en producción");
            return;
        }
        console.log("Ejecutando en modo desarrollo");
        (0, dataFakeGeneration_1.default)(100, "http://localhost:8000");
    }), 1000);
});
