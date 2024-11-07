import { z } from 'zod'

export const adminRegisterSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
    }),
    email: z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required',
    })
})

export const adminLoginSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
    }),
    password: z.string({
        required_error: 'Password is required',
    })
})

// Agrega más esquemas según tus necesidades aquí...
