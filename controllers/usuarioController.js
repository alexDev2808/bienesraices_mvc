import { check, validationResult } from 'express-validator'

import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/tokens.js'
import { emailRegistro } from '../helpers/emails.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesion'
    })
}

const formularioRegistro = (req, res) => {
    // vista, objeto con info para la vista
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken()
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
            csrfToken: req.csrfToken(),
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
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El usuario ya esta registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // Almacenar usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })

    // Envia msg de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    // Mostrar mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un email de confirmacion'
    })

}

// Funcion que comprueba una cuenta

const confirmar = async (req, res) => {
    const { token } = req.params;

    // Verificar token valido
    const usuario = await Usuario.findOne({where : {token}})

    if(!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }

    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;

    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta confirmada',
        mensaje: 'La cuenta se confirmo correctamente.'
    })


}


const formularioOlvidePassword = (req, res) => {
    // vista, objeto con info para la vista
    res.render('auth/olvide-password', {
        pagina: 'Recupera acceso a Bienes Raices',
        csrfToken: req.csrfToken(),

    })
}

const resetPassword = async (req, res) => {
    // validacion
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)

    let resultado = validationResult(req)

    // Verificar que el resultado no este vacio
    if(!resultado.isEmpty()) {
        return res.render('auth/olvide-password', {
            pagina: 'Recuperar cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    // Buscar usuario
    
}


export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar,
    confirmar,
    resetPassword
}