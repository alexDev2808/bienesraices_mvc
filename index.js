import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'

// Crear la app
const app = express()


app.set('view engine', 'pug')
app.set('views', './views')


// Carpeta publica
app.use(express.static('public'))


// Routing, use escanea los que inician con /
app.use('/auth', usuarioRoutes)




// Definir el puerto y arrancar server
const port = 3000

app.listen(port, () => {
    console.log(`Server en port: ${port}`);
})
