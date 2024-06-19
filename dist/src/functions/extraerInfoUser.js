"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extraer = (usuario) => {
    const { carrera, id, nombre, apellido, cedula, genero, fechaDeNacimiento, correo, telefono, direccion, sede, status, esEstudiante, esProfesor, esAdmin, } = usuario;
    const roles = { esEstudiante, esProfesor, esAdmin };
    const rolesActivos = Object.keys(roles).filter((role) => roles[role]);
    const resultado = {
        carrera,
        id,
        nombre,
        apellido,
        cedula,
        genero,
        fechaDeNacimiento,
        correo,
        telefono,
        direccion,
        sede,
        status,
        rolesActivos,
    };
    return resultado;
};
exports.default = extraer;
