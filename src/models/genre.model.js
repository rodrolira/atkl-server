// models/genre.model.js
import { DataTypes } from 'sequelize'
import sequelize from '../../db/sequelize.js'

const Genre = sequelize.define(
  'Genre',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: 'genres',
  }
)

export default Genre
