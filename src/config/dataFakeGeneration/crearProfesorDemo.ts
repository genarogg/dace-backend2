import bcrypt from "bcrypt";

import { Usuario } from "@models";

const crearProfesorDemo = async () => {
  // Crear un usuario demo
  const anaRosa = {
    nombre: "Ana",
    segundoNombre: "Rosa",
    apellido: "Ramos",
    segundoApellido: "Bolivar",
    cedula: "27369469",
    correo: "ana06rosa@gmail.com",
    telefono: "0412-1234567",
    contrasena: await bcrypt.hash("demo", 10),
    esProfesor: 1,
    esEstudiante: 1,
    status: "active",
  };

  await Usuario.create(anaRosa);

  const ultraDemo = {
    nombre: "demo",
    segundoNombre: "demo",
    apellido: "Ramos",
    segundoApellido: "Bolivar",
    cedula: "25074591",
    correo: "saiunerg@gmail.com",
    telefono: "0412-1234567",
    contrasena: await bcrypt.hash("#7654321Gx0", 10),
    esProfesor: 1,
    esEstudiante: 1,
    status: "inactive",
  };

  await Usuario.create(ultraDemo);

  // Crear 3 profesores demo ACTIVOS
  for (let i = 1; i < 3; i++) {
    let newProfesorDemo = {
      nombre: "demo",
      segundoNombre: "demo",
      apellido: "demo",
      segundoApellido: "demo",
      cedula: `0000000${i}`,
      correo: `demoProfesor${i}@gmail.com`,
      telefono: `0412-123456${i}`,
      contrasena: await bcrypt.hash("demo", 10),
      esProfesor: 1,
      /* esEstudiante: 1, */
      status: "active",
    };

    await Usuario.create(newProfesorDemo);
  }

  // Crear 3 profesores demo INACTIVOS
  for (let i = 4; i < 6; i++) {
    let newProfesorDemo = {
      nombre: "demo",
      segundoNombre: "demo",
      apellido: "demo",
      segundoApellido: "demo",
      cedula: `0000000${i}`,
      telefono: `0412-123456${i}`,
      esProfesor: 1,
      /* esEstudiante: 1, */
      status: "inactive",
    };

    await Usuario.create(newProfesorDemo);
  }
};

export default crearProfesorDemo;
