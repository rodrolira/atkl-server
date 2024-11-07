// models/artistRole.model.js
import { DataTypes } from 'sequelize'
import sequelize from '../../db/sequelize.js'
import Artist from './artist.model.js'
import Role from './role.model.js'

const ArtistRoles = sequelize.define('ArtistRoles', {
  artist_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Artist,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Role,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'artist_roles',
  timestamps: false
})

export default ArtistRoles
