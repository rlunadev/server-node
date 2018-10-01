var jwt = require('jsonwebtoken');
var seed = require('../config/config').SEED;

exports.verficaToken = function(req, res, next) {
    var token = req.query.token;
    jwt.verify(token, seed, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: true,
                mensaje: 'token error',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();
        // res.status(401).json({
        //     ok: true,
        //     decoded: decoded
        // });
    });
}

// app.use('/', (req, res, next) => {

// });