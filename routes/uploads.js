/**
 *  ruta: api/uploads/:tipo/:id
 */

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");

const { validarJWT } = require("../middlewares/validar-jwt");

const { fileUpload, getImagen } = require("../controllers/uploads");

const router = Router();

router.use(expressFileUpload());

router.get("/:tipo/:foto", getImagen);
router.put("/:tipo/:id", validarJWT, fileUpload);

module.exports = router;
