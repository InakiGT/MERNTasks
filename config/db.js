const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });//Accedemos a las variables que creamos con variables.env

const conectarDB = async () => {

    try {
        await mongoose.connect(process.env.DB_MONGO, {//process.env.DB_MONGO para acceder a la variable de la url que creamos en varibles.env
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });//url de conexión y configuración
        console.log('Database conectada');
    } catch(error) {
        console.log(error);
        process.exit(1); //En caso de haber un error en la conexión, detener la app
    }

}

module.exports = conectarDB;//Es como un export default de REACT