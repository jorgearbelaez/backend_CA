import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/userRoutes.js";
import profesionalRoutes from "./routes/professionalRoutes.js";
import busquedasRoutes from "./routes/searchesRoutes.js";
import reservaRoutes from "./routes/bookingRoutes.js";
import uploadsRoutes from "./routes/uploadsRoutes.js";

// Instanciando express
const app = express();

// Procesar la informacion de tipo JSON
app.use(express.json());

//morgan
app.use(morgan("dev"));

dotenv.config();

conectarDB();

// Configurar CORS
// const whitelist = [process.env.FRONTEND_URL];
// const corsOption = {
//   origin: function (origin, callback) {
//     if (whitelist.includes(origin)) {
//       // Puede consultar la API
//       callback(null, true);
//     } else {
//       // No esta permitido
//       callback(new Error("Error de Cors"));
//     }
//   },
// };
// app.use(cors(corsOption));
app.use(cors());

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/profesional", profesionalRoutes);
app.use("/api/buscar", busquedasRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/uploads", uploadsRoutes);

// Definiendo PORT
const PORT = process.env.PORT || 4000;

// Arrancando el servidor
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
