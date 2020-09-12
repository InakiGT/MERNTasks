const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //Revisar si hay errorres
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errores: errors.array()});
    }

    //extraer email y password
    const {email, password} = req.body;

    try {
        //Revisar que el usuario sea unico
        let usuario = await Usuario.findOne({email});//Verifica en el servidor si existe un dato con ese mismo valor

        if(usuario) {
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //crea el nuevo usuario
        usuario = new Usuario(req.body); //Le mandamos los datos al modelo Usuario

        //Hashear el password
        const salt = await bcryptjs.genSalt(10); //el salt es como las opciones del hash en php
        usuario.password = await bcryptjs.hash(password, salt);

        //Guardar usuario
        await usuario.save();

        //Crear y firmar el JWT 
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1 hora
        }, (error, token) => {
            if(error) throw error;

            //Mensaje de confirmacion
            res.json({token});
        });

        //Mensaje de confirmacion
       // res.json({msg: 'Usuario creado correctamente'});
    } catch(error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}