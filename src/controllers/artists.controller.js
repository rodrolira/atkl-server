// server/controllers/artists.controller.js
import Artist from '../models/artist.model.js';
import User from '../models/user.model.js';
import Release from '../models/release.model.js';
import Role from '../models/role.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ArtistRoles from '../models/artist_role.model.js';
import ReleaseArtist from '../models/release_artist.model.js';

dotenv.config();

export const addArtist = async (req, res) => {
  const {
    artist_name,
    email,
    username,
    roleIds,
    password,
    bio,
    bandcamp_link,
    facebook_link,
    instagram_link,
    soundcloud_link,
    twitter_link,
    youtube_link,
    spotify_link,
    apple_music_link,
    beatport_link,
  } = req.body;

  const imagePath = req.file ? `uploads\\${req.file.filename}` : undefined;

  if (!artist_name) {
    return res.status(400).json({ message: 'artist_name are required' });
  }

  try {
    let newUserId = null; // Variable para almacenar el ID del nuevo usuario
    
    // Solo crear un nuevo usuario si email, username y password son proporcionados
    if (email && username && password) {
    const newUser = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    newUserId = newUser.id;
    } 

    const newArtist = await Artist.create({
      artist_name,
      user_id: newUserId, // Esto puede ser null si no se crea un nuevo usuario
      email,
      bio,
      image: imagePath,
      bandcamp_link,
      facebook_link,
      instagram_link,
      soundcloud_link,
      twitter_link,
      youtube_link,
      spotify_link,
      apple_music_link,
      beatport_link,
    });

    // Verificar y convertir `roleIds` en array si es necesario
    const roleIdsArray = Array.isArray(roleIds)
      ? roleIds
      : typeof roleIds === 'string'
        ? roleIds.split(',').map((id) => parseInt(id.trim(), 10)) // Convertir string a array de números
        : []; // Si `roleIds` es nulo o undefined, usar array vacío


    // Asociar roles con el artista si se proporciona roleIds
    if (roleIdsArray.length > 0) {
      const artistRoles = roleIdsArray.map((roleId) => ({
        artist_id: newArtist.id,
        role_id: roleId,
      }));
      await ArtistRoles.bulkCreate(artistRoles);
    }


    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '12h' });
    res.cookie('token', token, { httpOnly: true });

    console.log('New artist created:', newArtist);
    res.status(201).json(newArtist);
  } catch (error) {
    console.error(`Error adding artist: ${error.message}`, error);
    return res.status(500).json({ message: error.message, details: error.stack });
  }
};

export const updateArtist = async (req, res) => {
  const { artistId } = req.params;
  let { roleIds, ...updateData } = req.body;

  // Verificar si hay un archivo subido para la imagen 
  const imagePath = req.file ? `uploads\\${req.file.filename}` : undefined;

  if (imagePath) {
    updateData.image = imagePath;
  }

  delete updateData.id;
  delete updateData.user_id;

  // Agregar logs para depuración
  console.log('Update Data before update:', updateData); // Verifica que updateData sea lo que esperas
  console.log('Image Path:', imagePath); // Verifica que imagePath sea una cadena



  try {
    await Artist.update(updateData, {
      where: { id: artistId },
    });

    // Si se proporcionan roleIds, actualizar los roles
    if (roleIds) {
      // Asegurarse de que roleIds es un arreglo
      if (typeof roleIds === 'string') {
        roleIds = roleIds.split(',').map((id) => parseInt(id, 10));
      } else if (!Array.isArray(roleIds)) {
        roleIds = [parseInt(roleIds, 10)];
      }

            // Elimina roles existentes para este artista
            await ArtistRoles.destroy({ where: { artist_id: artistId } });

      // Agrega los nuevos roles
      const rolesToAdd = roleIds.map(roleId => ({ artist_id: artistId, role_id: roleId }));
      await ArtistRoles.bulkCreate(rolesToAdd);
    }

    const updatedArtist = await Artist.findByPk(artistId, {
      include: [{
        model: Role,
        as: 'Roles',
        through: {
          attributes: [
            'artist_id',
            'role_id',
          ],
        },
      }],
    });


    res.json(updatedArtist);
  } catch (error) {
    console.error('Error updating artist:', error);
    res.status(500).json({ message: 'Error updating artist', details: error.message });
  }
};

export const deleteArtist = async (req, res) => {
  const { id } = req.params;

  try {

    const artist = await Artist.findOne({ where: { id } });
    if (!artist) {
      console.log(`No artist found for user_id: ${id}`);
      return res.status(404).json({ message: 'Artist not found' });
    }
    console.log(`Artist found with ID: ${artist.id}`);

    // Elimina los roles asociados al artista en la tabla `ArtistRoles`
    const rolesDeleted = await ArtistRoles.destroy({ where: { artist_id: artist.id } });
    console.log(`Roles deleted: ${rolesDeleted}`);

    // Elimina lanzamientos asociados al artista en la tabla `Release`
    const releasesDeleted = await ReleaseArtist.destroy({ where: { artist_id: artist.id } });
    console.log(`Releases deleted: ${releasesDeleted}`);


    // Elimina el artista
    const artistDeleted = await Artist.destroy({ where: { id: artist.id } });
    console.log(`Artist deleted: ${artistDeleted}`);

    // Finalmente, elimina el usuario
    const userDeleted = await User.destroy({ where: { id: artist.user_id } });
    console.log(`User deleted: ${userDeleted}`);

    res.status(200).json({ message: 'Artist and user account deleted successfully' });
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getArtists = async (req, res) => {

  try {
    const artists = await Artist.findAll({
      include: [{
        model: Role,
        as: 'Roles',
        through: { attributes: [] },
      }],
    });
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArtistById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid or missing artist ID' });
  }

  try {
    const artist = await Artist.findByPk(id, {
      include: [{ model: Role, as: 'Roles' }],
    });
    if (!artist) {
      console.warn(`No artist found with ID: ${id}`);
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.status(200).json(artist);
  } catch (error) {
    console.error('Error fetching artist by ID:', error);
    console.error(`Error fetching artist with ID ${id}:`, error);
    res.status(500).json({ message: error.message });
  }
};

export const getArtistReleases = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid or missing artist ID' });
  }

  try {
    const artist = await Artist.findByPk(id, {
      include: { model: Release, as: 'releases' },
    });

    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    res.status(200).json(artist.releases);
  } catch (error) {
    console.error(`Error fetching releases for artist ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};