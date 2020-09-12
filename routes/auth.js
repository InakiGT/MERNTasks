//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();//importamos el routing
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Iniciar Sesión
// api/auth
router.post('/', //Recibe un request
    authController.autenticarUsuario
);//Cuando se realicé un post se ejecutará esté código

//Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;//Exporta el router