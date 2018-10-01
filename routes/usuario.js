// rutas
var express = require('express');
var bcrypt = require('bcryptjs')
var mdAut = require('../middlewares/autenticacion');
var app = express();

var Usuario = require('../models/usuario');


// GET USERS
app.get('/', mdAut.verficaToken, (req, res, next) => {
    Usuario.find({}, (err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al traer usuarios',
                errors: err
            });
        }
        usuarios.password = '';
        res.status(403).json({
            ok: true,
            usuarios: usuarios
        });
    });
});

// POST USER
app.post('/', mdAut.verficaToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });
    usuario.save((err, usuarioSaved) => {
        if (err) {
            return res.status(400).json({
                ok: true,
                mensaje: 'error',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioSaved
        });
    });
});
// UPDATE USER
app.put('/:id', mdAut.verficaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el usuario con el ' + id + ' no existe',
                errors: { message: 'no se encontro el id con el usuario' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioSaved) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar el usuario',
                    errors: err
                });
            }
            usuarioSaved.password = ':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioSaved
            });
        });
    });
});

app.delete('/:id', mdAut.verficaToken, (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al borrar el usuario',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

});

module.exports = app;