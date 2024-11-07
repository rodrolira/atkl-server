// server/controllers/releases.controller.js
import Release from '../models/release.model.js'
import Artist from '../models/artist.model.js' // Importa el modelo Artist
import Genre from '../models/genre.model.js' // Importa el modelo Genre

export const addRelease = async (req, res) => {
  const {
    title,
    release_date,
    description,
    genre_id,
    release_type,
    artist_id, // Este debería ser un array
    bandcamp_link,
    beatport_link,
    spotify_link,
    apple_music_link,
    youtube_link,
    soundcloud_link,
  } = req.body
  // Verifica si hay un archivo subido para la imagen de portada
  const cover_image_url = req.file ? req.file.path : null

  // Verifica que los campos obligatorios estén presentes
  if (
    !title ||
    !genre_id
  ) {
    return res.status(400).json({
      message:
        'title, genre_id are required',
    })
  }

  try {
    // Crear el release
    const newRelease = await Release.create({
      title,
      release_date,
      description,
      genre_id,
      cover_image_url,
      release_type,
      bandcamp_link,
      beatport_link,
      spotify_link,
      apple_music_link,
      youtube_link,
      soundcloud_link,
    })

    // Asocia los artistas con el lanzamiento
    if (artist_id && artist_id.length > 0) {
      // Make sure each entry in artist_id is an integer
      const validArtistIds = artist_id.map((id) => parseInt(id)).filter((id) => !isNaN(id))
      await newRelease.setArtists(validArtistIds)
    }

    // Busca el lanzamiento con los artistas asociados
    const releaseWithArtists = await Release.findOne({
      where: { id: newRelease.id },
      include: {
        model: Artist,
        as: 'artists',
        attributes: ['id', 'artist_name'],
      }, // Incluye los artistas
    });


    res.status(201).json(releaseWithArtists)
  } catch (error) {
    // Handle errors
    console.error('Error adding release:', error)
    return res.status(500).json({ message: 'Failed to add release' })
  }
}

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
  const { id } = req.params
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
  } = req.body

  // Obtener el cover_image_url desde el archivo subido
  const cover_image_url = req.file ? req.file.path : null;

  // Validar que el título y otros campos necesarios estén presentes
  if (
    !title ||
    !artist_id ||
    artist_id.length === 0
  ) {
    return res
      .status(400)
      .json({ message: 'title, release_date, and at least one artist_id are required' })
  }
  console.log(`Updating release with ID: ${id}`)
  console.log('Update data:', req.body) // Log para verificar los datos recibidos

  try {
    // Actualizar el release en la base de datos
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
        returning: true, // Devolver el registro actualizado
      }
    )

    // Verificar si se actualizó algún registro
    if (affectedCount === 0) {
      return res.status(404).json({ error: 'Release not found' });
    }

    // Asocia los artistas con el lanzamiento
    if (artist_id && artist_id.length > 0) {
      await updatedRelease.setArtists(artist_id)
    }


    res.status(200).json(updatedRelease) // Devuelve el primer registro actualizado
  } catch (error) {
    console.error('Error updating release:', error)
    res.status(500).json({ message: error.message })
  }
}

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
