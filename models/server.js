const express = require('express')
    //const cors = require('cors')
const { dbConectar } = require('./../database/config');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.UsuariosPath = '/usuarios';
        this.authPath = '/auth';
        this.ProductosPath = '/productos';
        this.CategoriaPath = '/categorias';
        //Conexion
        this.dbConexion();
        //Middlewares
        this.middlewares()
            //Rutas
        this.routes()
    }

    async dbConexion() {
        await dbConectar();
    }

    middlewares() {
        //CORS
        //this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(express.json());
        // Servir carpeta publica
        //this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.UsuariosPath, require('../routes/user'));
        this.app.use(this.ProductosPath, require('../routes/productos'));
        this.app.use(this.CategoriaPath, require('../routes/categorias'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en en puerto', this.port)
        })
    }
}

module.exports = Server;