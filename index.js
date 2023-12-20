const express = require('express')

// Crear la app
const app = express()


// Routing
app.get('/', function(req, res) {
    res.send('Hola mundo en express')
})

// 
const port = 3000

app.listen(port, () => {
    console.log(`Server en port: ${port}`);
})
