//Rutas para crear usuarios
const express = require('express');
const router = express.Router();//importamos el routing
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');

//Crea un usuario
// api/usuarios
router.post('/', //Recibe un request
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), //Revisa que no este vacio
        check('email', 'Agrega un Email valido').isEmail(),
        check('password', 'El password debe de ser minimo de 6 caracteres').isLength({min: 6})
    ],
    usuarioController.crearUsuario
);//Cuando se realicé un post se ejecutará esté código

module.exports = router;//Exporta el router