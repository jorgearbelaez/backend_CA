import jwt from "jsonwebtoken";

// Generamos un jsonwebtoken del id el usuario
const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};
export default generarJWT;
