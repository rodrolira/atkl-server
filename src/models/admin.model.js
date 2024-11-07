// models/admin.model.js
import { DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'
import sequelize from '../../db/sequelize.js'

const Admin = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'admins',
  }
)

// Hash password before saving

Admin.beforeCreate(async (admin) => {
  const salt = await bcrypt.genSalt(10)
  admin.password = await bcrypt.hash(admin.password, salt)
})

export default Admin
