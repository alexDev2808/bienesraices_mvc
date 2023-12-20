import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes'

// Crear la app
const app = express()


// Routing, use escanea los que inician con /
app.use('/', usuarioRoutes)


// Definir el puerto y arrancar server
const port = 3000

app.listen(port, () => {
    console.log(`Server en port: ${port}`);
})
