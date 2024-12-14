import express from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/fieldsValidation.js";
import checkAuth from "../middlewares/checkAuth.js";
import isAdminRole from "../middlewares/isAdminRole.js";
import isSuperAdminRole from "../middlewares/isSuperAdminRole.js";

import {
  registrar,
  confirmar,
  olvidePassword,
  comprobarIdToken,
  actualizarPassword,
  perfil,
  actualizarPerfil,
  cambiarPassword,
  obtenerUsuario,
  desactivarUsuario,
  usuariosExcel,
  registrarProfesional,
} from "../controllers/userController.js";

// Instanciando el router de express
const usuarioRoutes = express.Router();

//Registro y confirmacion de usuarios

// crea un nuevo usuario
usuarioRoutes.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y debe ser de minimo 6 caracteres"
    ).isLength({ min: 6 }),
    check("email", "El email no es valido").isEmail(),
    validarCampos,
  ],
  registrar
);

// confirmar cuenta
usuarioRoutes.get("/confirmar/:token", confirmar);

//validar token y definir nuevo password
usuarioRoutes.post(
  "/olvide-password",
  [check("email", "Debes suministar un email válido").isEmail(), validarCampos],
  olvidePassword
);
usuarioRoutes
  .route("/olvide-password/:token")
  .get(comprobarIdToken)
  .post(
    [
      check(
        "password",
        "El nuevo password es obligatorio y debe ser de mínimo 6 caracteres"
      ).isLength({ min: 6 }),
      validarCampos,
    ],
    actualizarPassword
  );

//acceder al perfil
usuarioRoutes.get("/perfil", checkAuth, perfil);

// actualizar el perfil de un usuario
usuarioRoutes.put("/actualizar-perfil", checkAuth, actualizarPerfil);

//cambiar el password
usuarioRoutes.put("/cambiar-password", checkAuth, cambiarPassword);

//generar excel de usuarios
usuarioRoutes.get("/excel-usuarios", [checkAuth, isAdminRole], usuariosExcel);

//obtener un usario
usuarioRoutes.get(
  "/:id",
  [checkAuth, check("id", "no es un id válido").isMongoId(), validarCampos],
  obtenerUsuario
);

//desactivar un usuario
usuarioRoutes.delete(
  "/:id",
  [
    checkAuth,
    isSuperAdminRole,
    check("id", "no es un id válido").isMongoId(),
    validarCampos,
  ],
  desactivarUsuario
);

//PROFESIONAL
usuarioRoutes.post(
  "/registro-profesional",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y debe ser de minimo 6 caracteres"
    ).isLength({ min: 6 }),
    check("email", "El email no es valido").isEmail(),
    validarCampos,
  ],
  registrarProfesional
);

export default usuarioRoutes;
