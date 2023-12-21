import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'

import db from './config/db.js'

// Crear la app
const app = express()

// Habilitar lectura de forms
app.use(express.urlencoded({extended: true}))

// Habilitar cookie parser
app.use( cookieParser() )

// Habilitar CSRF
app.use( csrf({ cookie: true }))


// Conexion a DB
try {
    await db.authenticate();
    db.sync();
    console.log("Conn correcta");
} catch(error) {
    console.log(error);
}



app.set('view engine', 'pug')
app.set('views', './views')


// Carpeta publica
app.use(express.static('public'))


// Routing, use escanea los que inician con /
app.use('/auth', usuarioRoutes)




// Definir el puerto y arrancar server
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server en port: ${port}`);
})
