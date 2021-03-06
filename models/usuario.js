const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false,
    },
});

//para cambiar el esquema funcion normal para apuntatar correctamente con this
UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();//extraemos lo que queremos modificar
    object.uid = _id;
    return object;
})

module.exports = model( 'Usuario', UsuarioSchema );
