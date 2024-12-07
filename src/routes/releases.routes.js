import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinary.js';
import {
  addRelease,
  getReleases,
  getReleaseById,
  updateRelease,
  deleteRelease,
} from '../controllers/releases.controller.js';

const router = express.Router();

// Configuración de CloudinaryStorage para multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'releases',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
  },
});

const upload = multer({ storage });

// Rutas
router.get('/releases', getReleases);
router.get('/releases/:id', getReleaseById);

router.post('/releases', upload.single('cover_image_url'), addRelease);

router.put('/releases/:id', upload.single('cover_image_url'), updateRelease);
router.delete('/releases/:id', deleteRelease);

export default router;
