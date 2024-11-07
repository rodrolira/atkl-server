// controllers/genre.controller.js
import Genre from "../models/genre.model.js";
import prisma from "../prisma.js";

const getAllGenres = async (req, res) => {
  try {
    const genres = await prisma.genres.findMany();

    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "Unable to fetch genres" });
  }
};

const getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await prisma.genres.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch genre" });
  }
};

const createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const newGenre = await prisma.genres.create({
      data: {
         name
      }
        });
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ error: "Unable to create genre" });
  }
};

const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const genre = await prisma.genres.update({
      where: { id: parseInt(id, 10) },
      data: { name },
    });
    res.json(genre);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.status(500).json({ error: "Unable to update genre" });
  }
};

const deleteGenre = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.genres.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.status(500).json({ error: "Unable to delete genre" });
  }
};

export default {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};
