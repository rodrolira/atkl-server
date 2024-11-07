// routes/roles.routes.js
import express from 'express'
import sequelize from '../../db/sequelize.js'

const router = express.Router()

// Endpoint para obtener los roles únicos
router.get('/roles', async (req, res) => {
  try {
    // Consulta para obtener los valores de la enumeración
    const query = 'SELECT id, label FROM roles'
    const [results] = await sequelize.query(query) // Use Sequelize.query instead of sequelize.query

    // Formatear los roles como una lista de objetos con id y label
    const formattedRoles = results.map((role, index) => ({
      id: role.id, // o usa un identificador único si tienes uno
      label: role.label
    }))

    res.json(formattedRoles)
  } catch (error) {
    console.error('Error fetching roles:', error)
    res.status(500).json({ message: 'Error fetching roles' })
  }
})

export default router
