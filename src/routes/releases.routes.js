// routes/release.routes.js
import express from 'express'
import multer from 'multer' // Importa multer para manejar la carga de archivos
import {
  addRelease,
  getReleases,
  getReleaseById,
  updateRelease,
  deleteRelease,
} from '../controllers/releases.controller.js'
const router = express.Router()

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Define dónde se almacenarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`) // Define el nombre del archivo
  },
})

const upload = multer({ storage })

// Rutas
router.get('/releases', getReleases)
router.get('/releases/:id', getReleaseById)

router.post('/releases', upload.single('cover_image_url'), addRelease)

router.put('/releases/:id', upload.single('cover_image_url'), updateRelease)
router.delete('/releases/:id', deleteRelease)

export default router
