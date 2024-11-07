// routes/protectedRoutes.js

import { Router } from 'express'
import validateToken from '../middlewares/validateToken.js'

const router = Router()

// Ruta protegida que usa el middleware
router.get('/protected', validateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user })
})

export default router
