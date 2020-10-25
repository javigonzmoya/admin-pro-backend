/**
 *  path: /apilogin
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/",
  [
    check("email", "Email es obligatorio").isEmail(),
    check("password", "Contraseña es obligatoria").notEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
