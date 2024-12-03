// admin.controller.js

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.model.js'
import dotenv from 'dotenv'

dotenv.config()

const createToken = (adminId) => {
  return jwt.sign({ adminId, role: 'admin' }, process.env.SECRET, { expiresIn: '1d' })
}

const handleError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ message: `${message}: ${error.message}` })
}

const findAdmin = async (criteria) => {
  return await Admin.findOne({ where: criteria })
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

const findAdminByField = async (field, value) => {
  try {
    const admin = await findAdmin({ [field]: value })
    if (!admin) {
      throw new Error('Admin not found')
    }
    return admin
  } catch (error) {
    throw new Error(`Error finding admin by ${field}: ${error.message}`)
  }
}

export const findAdminByEmail = (email) => findAdminByField('email', email)

export const findAdminByUsername = (username) => findAdminByField('username', username)

export const getAllAdmins = async () => {
  try {
    return await Admin.findAll();
  } catch (error) {
    throw new Error(`Error fetching admins: ${error.message}`);
  }
}

export const loginAdmin = async (username, password) => {
  try {
    const admin = await findAdmin({ username });
    if (!admin) {
      console.log('Admin not found for username:', username);
      throw new Error('Admin not found')
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    console.log('Password match status:', isMatch);

    if (!isMatch) {
      throw new Error('Invalid credentials')
    }

    const token = createToken(admin.id)
    console.log('Generated token:', token)
    return { token, admin };

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

export const verifyTokenAdmin = (req, res, next) => {
  const token = req.cookies.token ?? req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.adminId = decoded.adminId
    next()
  })
}

export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    handleError(res, error, 'Error logging out')
  }
}

export const deleteAdmin = async (req, res) => {
  try {
    const { username } = req.params
    const admin = await Admin.findOne({ where: { username } })
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }
    await Admin.destroy({
      where: {
        username
      }
    })
    res.status(200).json({ message: 'Admin deleted successfully' })
  } catch (error) {
    handleError(res, error, 'Error deleting admin')
  }
}
