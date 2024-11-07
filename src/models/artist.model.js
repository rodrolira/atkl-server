// models/artist.model.js
import { DataTypes } from 'sequelize'
import sequelize from '../../db/sequelize.js'

const Artist = sequelize.define(
  'Artist',
  {
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'artist_name',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bandcamp_link: {
      type: DataTypes.STRING(255),
      field: 'bandcamp_link',
    },
    facebook_link: {
      type: DataTypes.STRING(255),
      field: 'facebook_link',
    },
    instagram_link: {
      type: DataTypes.STRING(255),
      field: 'instagram_link',
    },
    soundcloud_link: {
      type: DataTypes.STRING(255),
      field: 'soundcloud_link',
    },
    twitter_link: {
      type: DataTypes.STRING(255),
      field: 'twitter_link',
    },
    youtube_link: {
      type: DataTypes.STRING(255),
      field: 'youtube_link',
    },
    spotify_link: {
      type: DataTypes.STRING(255),
      field: 'spotify_link',
    },
    apple_music_link: {
      type: DataTypes.STRING(255),
    },
    beatport_link: {
      type: DataTypes.STRING(255),
      field: 'beatport_link',
    },
  },
  {
    timestamps: true,
    tableName: 'artists',
  }
)
export default Artist
