const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token');

    //Revisar si no hat token
    if(!token) {
        return res.status(401).json({msg: 'No hay Token, permiso no valido'});
    }
    //Validar token
    try {

        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();//Especificamos que se vaya al siguiente Middlewre en proyectos .post
    } catch(error) {
        res.status(401).json({msg: 'Token no valido'});
    }
}