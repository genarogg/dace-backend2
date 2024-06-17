import { Request, Response } from "express";
import { Usuario } from "../../models";

import { verificarToken } from "@fn";

const dataUserGet = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("dataUserGet");
    const usuario = verificarToken(req.headers.authorization, res);

    if (!usuario) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    const { id } = usuario;

    const user = await Usuario.findOne({ where: { id } });

    let birthdate = "";
    if (user?.fechaDeNacimiento instanceof Date) {
      birthdate = user.fechaDeNacimiento.toISOString().split("T")[0];
    }

    const data = {
      email: user?.correo,
      firstName: user?.nombre,
      secondName: user?.segundoNombre,
      firstSurname: user?.apellido,
      secondSurname: user?.segundoApellido,
      birthdate,
      direction: user?.direccion,
      phoneNumber: user?.telefono,
      sex: user?.genero,
      parroquia: user?.parroquia,
      etnia: "",
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export default dataUserGet;
