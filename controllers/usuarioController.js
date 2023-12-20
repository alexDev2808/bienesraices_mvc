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


const formularioOlvidePassword = (req, res) => {
    // vista, objeto con info para la vista
    res.render('auth/olvide-password', {
        pagina: 'Recupera acceso a Bienes Raices'
    })
}


export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword
}