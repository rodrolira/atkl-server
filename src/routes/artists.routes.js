// routes/artists.routes.js
import express from 'express'
import formidable from 'formidable'
import { uploadFile } from '../../s3.js'
import {
  getArtists,
  addArtist,
  deleteArtist,
  updateArtist,
  getArtistById,
  getArtistReleases,
} from '../controllers/artists.controller.js'


const router = express.Router()

// Middleware para procesar los archivos del formulario
const upload = formidable({
  multiples: false, // Solo una imagen por vez
  uploadDir: './uploads', // Directorio temporal
  keepExtensions: true, // Mantener las extensiones de los archivos
});


router.get('/artists', getArtists)
router.get('/artists/:id', getArtistById)
router.get('/artists/:id/releases', getArtistReleases)

// Ruta para agregar un artista con su foto
router.post('/artists', (req, res) => {
  upload.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error al procesar el archivo:', err);
      return res.status(500).send({ error: 'File upload failed' });
    }

    // Verificar si se subió una imagen
    if (!files.image) {
      return res.status(400).send('No se subió ninguna imagen.');
    }

    try {

      const file = files.image[0]; // Obtener el primer archivo de la imagen
      const imageName = `${Date.now()}-${file.originalFilename}`;

      // Subir la imagen a S3
      const imageUrl = await uploadFile(file, imageName);

      // Crear los datos del artista (incluyendo la URL de la imagen en S3)
      const artistData = {
        ...fields,
        image: imageUrl,  // Guardamos la URL de la imagen subida
      };

      // Llamamos al controlador de addArtist y le pasamos los datos del artista
      const newArtist = await addArtist(artistData);

      res.status(201).json(newArtist);
    } catch (err) {
      console.error('Error al agregar el artista:', err);
      res.status(500).send('Error interno del servidor');
    }
  });
});

// router.put('/artists/:artistId', upload.single('image'), updateArtist)
router.delete('/artists/:id', deleteArtist)

export default router

