import express from 'express'
import nodemailer from 'nodemailer'

const router = express.Router()

router.post('/submit-form', async (req, res) => {
    const { name, email, description } = req.body

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'atkl.records@gmail.com',
                pass: 'njyy jaob csid scmt'
            }
        })

        const mailOptions = {
            from: 'atkl.records@gmail.com',
            to: email,
            subject: 'Nuevo formulario de contacto',
            text: `Nombre: ${name}\nCorreo electrónico: ${email}\nDescripción: ${description}`
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent:', info.response)
        res.status(200).json({ message: 'Form submitted successfully' })
    } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ message: 'Error sending email' })
    }
})

export default router
