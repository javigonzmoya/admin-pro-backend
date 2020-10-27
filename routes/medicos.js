/**
 * ruta /api/medicos
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getMedicos,
  addMedico,
  updateMedico,
  deleteMedico,
} = require("../controllers/medicos");

const router = Router();

router.get("/", getMedicos); // podemos llmar a midell para validar en segunda posicion del argumento si son varios como arr
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "nombre del medico es requerido").notEmpty(),
    check("hospital", "Hospital id es requerido").isMongoId(),
    validarCampos,
  ],
  addMedico
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "nombre del medico es requerido").notEmpty(),
    check("hospital", "Hospital id es requerido").isMongoId(),
    validarCampos,
  ],
  updateMedico
); // podemos llmar a midell para validar en segunda posicion del argumento si son varios como arr

router.delete("/:id", deleteMedico);

module.exports = router;
