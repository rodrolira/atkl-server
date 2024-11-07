// middleware/validateToken.js

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Admin from '../models/admin.model.js';

dotenv.config()

export const verifyTokenAdmin = async(req, res, next) => {
    // Obtener el token de las cookies
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token; // Intentar obtener el token de cookies o del encabezado
    
    if (!token) {
      return res.status(403).json({ message: 'Access denied, no token provided' });
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        const admin = Admin.findByPk(decoded.id);

        if (!admin) {
            console.error('Admin not found');
            return res.status(401).json({ message: 'Admin not found' });
        }
    // Almacenar el ID del administrador en el objeto `req` para usarlo en la siguiente función
    req.adminId = admin.id;

    // Continuar con la siguiente función
    next();
  }   catch (error) { 
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

