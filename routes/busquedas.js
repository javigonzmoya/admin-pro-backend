/**
 *  ruta: api/yodo/:busqueda
 */

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const { getTodo, getTodoColeccion } = require("../controllers/busquedas");

const router = Router();

router.get("/:busqueda", validarJWT, getTodo);
router.get("/coleccion/:tabla/:busqueda", validarJWT, getTodoColeccion);

module.exports = router;
