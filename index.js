const express = require('express');//Importamos express 
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el servidor 
const app = express();//Utilizamos la función de express

//Conectar a la base de datos
conectarDB();

//Habilitar cors 
app.use(cors());

//Habilitar express.json
app.use(express.json({extended: true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;//Si no existe se asigna al puerto 4000, esto porque el cliente ya está en el puerto 3000

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});