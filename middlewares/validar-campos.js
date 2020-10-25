const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next) => {

    //atrapamos errores
    const errores = validationResult( req );
    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped() //devolvemos los errores en forma de objeto
        })
    }

    next();

};

module.exports = {
    validarCampos
};