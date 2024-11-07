// db/sequelize.js
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const isRender = process.env.RENDER === 'true'; // Set `RENDER=true` in Render environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: isRender 
    ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    } // Add this line to enable SSL/TLS
    : {}, 
  }
)

export default sequelize
