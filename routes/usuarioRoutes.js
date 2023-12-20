import express from 'express'

const router = express.Router();


// Routing
router.get('/', function(req, res) {
    res.send('Hola mundo en express')
})


export default router