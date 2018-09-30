// REQUIRES
var express = require('express');
var mongoose = require('mongoose');
// inicia variables
var app = express();
// conecta database
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

// rutas
app.get('/', (req, res, next) => {
    res.status(403).json({
        ok: true,
        mensaje: 'correcto'
    })
})

//escucah peticiones
app.listen(3001, () => {
    console.log('servidor \x1b[32m%s\x1b[0m', 'iniciado');
})