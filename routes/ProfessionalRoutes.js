import express from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/fieldsValidation.js";
import checkAuth from "../middlewares/checkAuth.js";
import isAdminRole from "../middlewares/isAdminRole.js";
import {
  actualizarProfesional,
  perfilProfesional,
  crearDisponibilidad,
  editarDisponibilidad,
  eliminarDisponibilidad,
} from "../controllers/professionalController.js";

const profesionalRoutes = express.Router();

profesionalRoutes.get("/perfil", checkAuth, perfilProfesional);

profesionalRoutes.put(
  "/actualizar-profesional",
  checkAuth,
  actualizarProfesional
);
profesionalRoutes.post("/", checkAuth, crearDisponibilidad);

profesionalRoutes.put("/:id", checkAuth, editarDisponibilidad);
profesionalRoutes.delete("/:id", checkAuth, eliminarDisponibilidad);

export default profesionalRoutes;
