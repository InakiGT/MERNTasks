const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto'); 
const {validationResult} = require('express-validator');

//Crea una nueva tarea
exports.crearTarea = async (req, res) => {

    //Revisar si hay errorres
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errores: errors.array()});
    }


    try {

        
        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
             return res.status(404).json({msg:'El proyecto no existe'});
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});
    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    } 

}

//Obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {

    try {

        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
             return res.status(404).json({msg:'El proyecto no existe'});
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Obtenemos las tareas por proyecto
        const tareas = await Tarea.find({proyecto}).sort({creado: -1});
        res.json({tareas});

    } catch(error) {
        res.status(500).send('Hubo un error');
    }

}

//Actualiza una tarea 
exports.actualizarTarea = async (req, res) => {

    try {

        //Extraer el proyecto y comprobar si existe
        const {proyecto, nombre, estado} = req.body;

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
    
        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Revisar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        //Crear un objeto con la nueva info
        const nuevaTarea = {};
        
        nuevaTarea.nombre = nombre;       
        nuevaTarea.estado = estado;
    

        //Guardar la tarea 
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});

        res.json({tarea});

    } catch(error) {
        console.log('error');
        res.status(500).send('Hubo un error');
    } 

}

exports.eliminarTarea = async (req, res) => {
    try {

        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
    
        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Revisar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        //Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'});

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}