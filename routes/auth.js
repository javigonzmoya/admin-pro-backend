/**
 *  path: /apilogin
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { login, renweToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

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

router.get("/renew", validarJWT, renweToken);

module.exports = router;
