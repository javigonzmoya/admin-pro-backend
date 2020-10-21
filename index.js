const express = require('express');
require('dotenv').config();//para leer variables de entorno

const cors = require('cors');
const { dbConnection } = require('./database/config');
const { PromiseProvider } = require('mongoose');

// crear servidor express
const app = express();
// configurar cors
app.use( cors() )

dbConnection();

//QvC0uOg0K2AXxOxh
//mean_user

//Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola mundo'
    })

});




app.listen( process.env.PORT, () =>{
    console.log('servidor corriendooooo')
});