var mongoose = require('mongoose');
var uniqueValidador = require('mongoose-unique-validator');

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es valido'
}
var schemma = mongoose.Schema;

var usuarioSchema = new schemma({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    email: { type: String, unique: true, required: [true, 'El email es requerido'] },
    password: { type: String, required: [true, 'El password es requerido'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});

usuarioSchema.plugin(uniqueValidador, { message: 'el {PATH} debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);