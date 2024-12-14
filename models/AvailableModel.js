import mongoose from "mongoose";

const disponibilidadSchema = mongoose.Schema(
  {
    fecha: {
      type: String,
      requerido: true,
    },
    hora: {
      type: [String],
    },

    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PerfilProfesional",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Disponibilidad = mongoose.model("Disponibilidad", disponibilidadSchema);

export default Disponibilidad;
