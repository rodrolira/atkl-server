'use strict'

import { readdirSync } from 'fs'
import { basename as _basename, join } from 'path'
import Sequelize, { DataTypes } from 'sequelize'
import { env as _env } from 'process'

// Importa los modelos de artistas y releases
import sequelize from '../../db/sequelize.js';
import './release.model.js'; // Importa el modelo Release
import './artist.model.js';  // Importa el modelo Artist
import './genre.model.js';   // Importa el modelo Genre
import './user.model.js';   // Importa el modelo User
import './release_artist.model.js'; // Importa el modelo ReleaseArtist
import './role.model.js'; // Importa el modelo Role
import './artist_role.model.js'; // Importa el modelo ArtistRole
import './associations.js';  // Importa el archivo de asociaciones
import './teammember.model.js'

const basename = _basename(__filename)
const env = _env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })
  .forEach(file => {
    const model = require(join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
