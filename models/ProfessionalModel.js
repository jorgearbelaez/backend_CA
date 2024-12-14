import mongoose from "mongoose";

const perfilprofesionalSchema = mongoose.Schema(
  {
    descripcion: {
      type: String,
      trim: true,
    },
    especialidad: Array,
    disponibilidad: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Disponibilidad",
      },
    ],
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    reservas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reseva",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PerfilProfesional = mongoose.model(
  "PerfilProfesional",
  perfilprofesionalSchema
);

export default PerfilProfesional;
