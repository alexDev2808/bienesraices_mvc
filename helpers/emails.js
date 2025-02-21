import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, nombre, token } = datos

    //   enviar email
    await transport.sendMail({
        from: 'admin@bienesraices.com',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en bienesraices.com</p>

            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar cuenta</a></p>

            <p>Si tu no creaste tu cuenta, puedes ignorar este mensaje</p>
        `
    })
}


const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, nombre, token } = datos

    //   enviar email
    await transport.sendMail({
        from: 'admin@bienesraices.com',
        to: email,
        subject: 'Recupera tu cuenta en BienesRaices.com',
        text: 'Recupera tu cuenta en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, has solicitado restablecer tu password en bienesraices.com</p>

            <p>Sigue el siguiente enlace para generar un password nuevo:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Reestablecer password</a></p>

            <p>Si tu no solicitaste el cambio, puedes ignorar este mensaje</p>
        `
    })
}


export {
    emailRegistro,
    emailOlvidePassword
}