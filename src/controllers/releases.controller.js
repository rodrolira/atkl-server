// server/controllers/releases.controller.js
import Release from '../models/release.model.js'
import Artist from '../models/artist.model.js' // Importa el modelo Artist
import Genre from '../models/genre.model.js' // Importa el modelo Genre
import cloudinary from '../../config/cloudinary.js'

export const addRelease = async (req, res) => {
  const {
    title,
    release_date,
    description,
    genre_id,
    release_type,
    artist_id,
    bandcamp_link,
    beatport_link,
    spotify_link,
    apple_music_link,
    youtube_link,
    soundcloud_link,
  } = req.body;

  try {
    // Subir imagen a Cloudinary si está presente
    let cover_image_url = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'releases',
        use_filename: true,
      });
      cover_image_url = result.secure_url; // URL segura de la imagen subida
    }

    // Validar campos obligatorios
    if (!title || !genre_id) {
      return res.status(400).json({ message: 'title and genre_id are required' });
    }

    // Crear el release
    const newRelease = await Release.create({
      title,
      release_date,
      description,
      genre_id,
      release_type,
      cover_image_url,
      bandcamp_link,
      beatport_link,
      spotify_link,
      apple_music_link,
      youtube_link,
      soundcloud_link,
    });

    // Asociar artistas con el lanzamiento
    if (artist_id && artist_id.length > 0) {
      const validArtistIds = artist_id.map((id) => parseInt(id)).filter((id) => !isNaN(id));
      await newRelease.setArtists(validArtistIds);
    }

    // Obtener el lanzamiento con los artistas asociados
    const releaseWithArtists = await Release.findOne({
      where: { id: newRelease.id },
      include: {
        model: Artist,
        as: 'artists',
        attributes: ['id', 'artist_name'],
      },
    });

    res.status(201).json(releaseWithArtists);
  } catch (error) {
    console.error('Error adding release:', error);
    res.status(500).json({ message: 'Failed to add release', error: error.message });
  }
};

export const getReleases = async (req, res) => {
  try {
    const releases = await Release.findAll({
      include: [
        {
          model: Artist,
          as: 'artists',
        }
      ],
    })
    res.status(200).json(releases)
  } catch (error) {
    if (error.message === 'Artist is not associated to Release!') {
      res.status(400).json({ message: 'Artist is not associated to Release!' })
    } else {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getReleaseById = async (req, res) => {
  const { id } = req.params

  try {
    const release = await Release.findByPk(id, {
      include: [
        {
          model:
            Genre, as: 'genre', attributes: ['name']
        },
        {
          model:
            Artist, as: 'artists'
        }],
    })
    if (!release) {
      return res.status(404).json({ message: 'Release not found' })
    }

    res.status(200).json(release)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateRelease = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    release_date,
    description,
    genre_id,
    release_type,
    artist_id,
    bandcamp_link,
    beatport_link,
    spotify_link,
    apple_music_link,
    youtube_link,
    soundcloud_link,
  } = req.body;

  try {
    // Subir nueva imagen a Cloudinary si está presente
    let cover_image_url = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'releases',
        use_filename: true,
      });
      cover_image_url = result.secure_url; // URL segura de la nueva imagen subida
    }

    // Validar campos obligatorios
    if (!title || !artist_id || artist_id.length === 0) {
      return res.status(400).json({ message: 'title, release_date, and at least one artist_id are required' });
    }

    // Actualizar el release
    const [affectedCount, [updatedRelease]] = await Release.update(
      {
        title,
        release_date,
        description,
        genre_id,
        release_type,
        cover_image_url,
        bandcamp_link,
        beatport_link,
        spotify_link,
        apple_music_link,
        youtube_link,
        soundcloud_link,
      },
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedCount === 0) {
      return res.status(404).json({ message: 'Release not found' });
    }

    // Asociar artistas con el lanzamiento
    if (artist_id && artist_id.length > 0) {
      const validArtistIds = artist_id.map((id) => parseInt(id)).filter((id) => !isNaN(id));
      await updatedRelease.setArtists(validArtistIds);
    }

    res.status(200).json(updatedRelease);
  } catch (error) {
    console.error('Error updating release:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteRelease = async (req, res) => {
  try {
    const { id } = req.params
    const release = await Release.findByPk(id)
    if (!release) {
      return res.status(404).json({ message: 'Release not found' })
    }
    // Eliminar el release de la base de datos
    await Release.destroy({
      where: {
        id,
      },
    })

    res.status(200).json({ message: 'Release deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
