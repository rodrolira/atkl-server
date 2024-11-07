// user.routes.js

import express from 'express'
import * as userController from '../controllers/auth.controller.js'
import { verifyTokenUser } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const newUser = await userController.createUser({
      username,
      email,
      password,
    })
    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ message: 'Server Error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const token = await userController.loginUser(username, password)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'dev',
      maxAge: 12 * 60 * 60 * 1000, // 12hrs
    })

    res.json({ message: 'Login successful', user: { username, password } })
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

router.post('/logout', userController.logoutUser)

router.get('/profile', verifyTokenUser, async (req, res) => {
  try {
    const user = await userController.profileUser(req.userId)
    res.json({ user })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ message: 'Server Error' })
  }
})

router.get('/verify', async (req, res) => {
  const { token } = req.cookies
  try {
    const user = await userController.verifyTokenUser(token)
    res.json({ user })
    } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
})

export default router
