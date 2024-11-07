// routes/discography.routes.js
import { Router } from 'express'
import Discography from '../models/discography.model.js'

const router = Router()

// Crear varios tracks a partir de datos CSV
// Crear varios tracks a partir de datos CSV
router.post('/discography/bulk', async (req, res) => {
    try {
        const tracks = req.body
        if (!Array.isArray(tracks)) {
            return res.status(400).json({ error: 'Los datos deben ser una lista de registros.' })
        }
         // Verificar y limpiar los datos antes de insertarlos
        const cleanedTracks = tracks.map(track => ({
            title: track.title,
            artist: track.artist,
            release_title: track.release_title,
            catalogue: track.catalogue,
            release_type: track.release_type,
            release_date: track.release_date,
            genre: track.genre,
            file_info: track.file_info,
            download_url: track.download_url,
        }))

        const results = await Promise.all(tracks.map(track => Discography.create(track)))
        res.status(201).json(results)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Crear un nuevo track
router.post('/discography', async (req, res) => {
    try {
        const track = await Discography.create(req.body)
        res.status(201).json(track)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Obtener todos los tracks
router.get('/discography', async (req, res) => {
    try {
        const tracks = await Discography.findAll()
        res.status(200).json(tracks)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Obtener un track por ID
router.get('/discography/:id', async (req, res) => {
    try {
        const track = await Discography.findByPk(req.params.id)
        if (!track) return res.status(404).json({ error: 'Track not found' })
        res.status(200).json(track)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Actualizar un track por ID
router.put('/discography/:id', async (req, res) => {
    try {
        const [updated] = await Discography.update(req.body, {
            where: { id: req.params.id }
        })
        if (updated) {
            const updatedTrack = await Discography.findByPk(req.params.id)
            res.status(200).json(updatedTrack)
        } else {
            res.status(404).json({ error: 'Track not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Eliminar un track por ID
router.delete('/discography/:id', async (req, res) => {
    try {
        const deleted = await Discography.destroy({
            where: { id: req.params.id }
        })
        if (deleted) {
            res.status(204).json({})
        } else {
            res.status(404).json({ error: 'Track not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
