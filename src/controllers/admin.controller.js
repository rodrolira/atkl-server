// admin.controller.js

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.model.js'
import dotenv from 'dotenv'


dotenv.config()

const createToken = (adminId) => {
  return jwt.sign({ adminId, role: 'admin' }, process.env.SECRET, { expiresIn: '1d' })
}
export const createAdmin = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    return await Admin.create({
            username,
            email,
          password: hashedPassword,
        });
  } catch (error) {
    throw new Error(`Error creating admin: ${error.message}`)
  }
}

export const findAdminByEmail = async (email) => {
  try {
    const admin = await Admin.findOne({ where: { email } })
    if (!admin) {
      throw new Error('Admin not found')
    }
    return admin
  } catch (error) {
    throw new Error(`Error finding admin by email: ${error.message}`)
  }
}

export const findAdminByUsername = async (username) => {
  try {
    const admin = await Admin.findOne({ where: { username } })
    if (!admin) {
      throw new Error('Admin not found')
    }
    return admin
  } catch (error) {
    throw new Error(`Error finding admin by username: ${error.message}`)
  }
}

export const loginAdmin = async (username, password) => {
  try {
    const admin = await Admin.findOne({ where: { username } })

    if (!admin) {
      console.log('Admin not found for username:', username);
      throw new Error('Admin not found')
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    console.log('Password match status:', isMatch); // Check if passwords match

    if (!isMatch) {
      throw new Error('Invalid credentials')
    }

    const token = createToken(admin.id)
    console.log('Generated token:', token) // Verificar el token en el servidor

    return token
  } catch (error) {
    throw new Error(`Error logging in admin: ${error.message}`)
  }
}

export const profileAdmin = async (adminId) => {
  try {
    const admin = await Admin.findByPk(adminId)

    if (!admin) {
      throw new Error('Admin not found')
    }
    
    return admin
  } catch (error) {
    throw new Error(`Error fetching admin profile: ${error.message}`)
  }
}

export const verifyTokenAdmin = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    if (decoded.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const admin = await Admin.findByPk(decoded.adminId);

    if (!admin) {
      throw new Error('Unauthorized');
    }

    return admin;
  } catch (error) {
    throw new Error(`Error verifying token: ${error.message}`);
  }
    }


export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    res.status(500).json({ message: `Error logging out: ${error.message}` })
  }
}
