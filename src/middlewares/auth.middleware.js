// middleware/auth.middleware.js

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyTokenUser = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' })
      } else {
        return res.status(401).json({ message: 'Unauthorized' })
      }
    }

    req.userId = decoded.userId
    next()
  })
}
