/*
        Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", validarJWT, getUsuarios); // podemos llmar a midell para validar en segunda posicion del argumento si son varios como arr
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "El password es obligatorio").notEmpty(),
    check("email", "El email es obligatorio y formato valido").isEmail(),
    validarCampos, //llamamos almiddle tras coger los errores
  ],
  addUsuario
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El email es obligatorio y formato valido").isEmail(),
    validarCampos, //llamamos almiddle tras coger los errores
  ],
  updateUsuario
); // podemos llmar a midell para validar en segunda posicion del argumento si son varios como arr

router.delete("/:id", validarJWT, deleteUsuario);

module.exports = router;
