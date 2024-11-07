// models/release_artist.model.js
import { DataTypes } from 'sequelize'
import sequelize from '../../db/sequelize.js'

const ReleaseArtist = sequelize.define(
  'ReleaseArtist',
  {
    release_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

export default ReleaseArtist
