// models/role.model.js
import { DataTypes } from 'sequelize'
import sequelize from '../../db/sequelize.js'

const Role = sequelize.define('Role', {
    label: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
  },
  {
    tableName: 'roles',
    modelName: 'roles',
    timestamps: false
  }
)

export default Role
