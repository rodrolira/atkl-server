import { DataTypes } from 'sequelize'
import sequelize from '../../db/sequelize.js'
import Genre from './genre.model.js'

const Release = sequelize.define(
  'Release',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Genre,
      },
      allowNull: true, // Adjust this as per your schema
    },
    is_explicit: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cover_image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    release_type: {
      type: DataTypes.ENUM('Album', 'EP', 'Single', 'V.A'),
      allowNull: false,
    },
    bandcamp_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    beatport_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spotify_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apple_music_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    youtube_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    soundcloud_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: 'releases',
  }
)

export default Release
