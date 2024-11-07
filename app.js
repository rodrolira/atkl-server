// app.js
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
// import http from "http";
import authRoutes from './src/routes/auth.routes.js'
import artistsRoutes from './src/routes/artists.routes.js'
import releasesRoutes from './src/routes/releases.routes.js'
import adminRoutes from './src/routes/admin.routes.js'
import genreRoutes from './src/routes/genre.routes.js'
import contactFormRoutes from './src/routes/contact-form.routes.js'
import rolesRouter from './src/routes/roles.routes.js'
import discographyRoutes from './src/routes/discography.routes.js'
import postgres from 'postgres'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config()

// Crear __dirname en un modulo ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname)
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename)

    console.log(`File saved to: ${filename}`);

  },
})

const upload = multer({ storage })
// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Lista de origenes permitidos prodccion y desarrollo
const allowedOrigins = ['http://localhost:5173', 'https://atkl.vercel.app', 'https://atkl.onrender.com']

app.use(cors({
  origin: (origin, callback) => {
    // Permite solicitudes de cualquier origen como Postman
    if (!origin) {
      return callback(null, true)
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: 'Access-Control-Allow-Origin' // Agrega esta línea
}))

// app.use(
//   cors({
//     origin: 'https://atkl.vercel.app',
//     credentials: true,
//     methods: ['GET', 'POST', 'DELETE', 'PUT'],
//     // Agrega DELETE aquí si es necesario

//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: 'Access-Control-Allow-Origin' // Agrega esta línea
//   })
// )
//  const corsOptions = {
//    origin: 'http://localhost:5173',
//    credentials: true,
//    methods: ['GET', 'POST', 'DELETE', 'PUT'],
//    // Agrega DELETE aquí si es necesario
//    allowedHeaders: ['Content-Type', 'Authorization'],
//  }
//  app.use(
//    cors(corsOptions)
//  )
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// Rutas públicas
app.use('/api', authRoutes)
app.use('/api', artistsRoutes)
app.use('/api', releasesRoutes)
app.use('/api', adminRoutes)
app.use('/api', contactFormRoutes)
app.use('/api', genreRoutes)
app.use('/api', rolesRouter)
app.use('/api', discographyRoutes)


// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.log(err)
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  res.status(status).send(message)
})

// Middleware para manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Page not found' })
})



export default app
