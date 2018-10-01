// REQUIRES
var express = require('express');
var mongoose = require('mongoose');
var bodyParse = require('body-parser');
// inicia variables
var app = express();

app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())

// conecta database
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

// import routes
var appRoutes = require('./routes/app');
var appUsuarios = require('./routes/usuario');
var loginRoutes = require('./routes/login');
// rutas
app.use('/usuarios', appUsuarios);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

//escucah peticiones
app.listen(3001, () => {
    console.log('servidor \x1b[32m%s\x1b[0m', 'iniciado');
})