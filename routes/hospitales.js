/**
 *  ruta /api/hospìtales
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getHospitales,
  addHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitales");

const router = Router();

router.get("/", getHospitales); // podemos llmar a midell para validar en segunda posicion del argumento si son varios como arr
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "nombre es requerido").notEmpty(),
    validarCampos,
  ],
  addHospital
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "nombre es requerido").notEmpty(),
    validarCampos,
  ],
  updateHospital
); // podemos llmar a midell para validar en segunda posicion del argumento si son varios como arr

router.delete("/:id", validarJWT, deleteHospital);

module.exports = router;
