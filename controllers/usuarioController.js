import { check, validationResult } from 'express-validator'

import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/tokens.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesion'
    })
}

const formularioRegistro = (req, res) => {
    // vista, objeto con info para la vista
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}

const registrar = async (req, res) => {
    // validacion
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({min: 6}).withMessage('El password debe ser de minimo 6 carateres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Los passwords no coinciden').run(req)

    let resultado = validationResult(req)

    // Verificar que el resultado no este vacio
    if(!resultado.isEmpty()) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }


    // Extraer datos
    const { nombre, email, password } = req.body


    // Verificar si existe el usuario
    const existeUsuario = await Usuario.findOne({ where: { email }})

    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: [{msg: 'El usuario ya esta registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // Almacenar usuario
    await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })

}

const formularioOlvidePassword = (req, res) => {
    // vista, objeto con info para la vista
    res.render('auth/olvide-password', {
        pagina: 'Recupera acceso a Bienes Raices'
    })
}



export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar
}