// routes/artists.routes.js
import express from 'express'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinary.js';
import {
  getArtists,
  addArtist,
  deleteArtist,
  updateArtist,
  getArtistById,
  getArtistReleases,
} from '../controllers/artists.controller.js'


const router = express.Router()

// Configuración de CloudinaryStorage para multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'artists',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
  },
});

const upload = multer({ storage });

router.get('/artists', getArtists)
router.get('/artists/:id', getArtistById)
router.get('/artists/:id/releases', getArtistReleases)

router.post('/artists', upload.single('image'), addArtist)

router.put('/artists/:artistId', upload.single('image'), updateArtist)
router.delete('/artists/:id', deleteArtist)

export default router

