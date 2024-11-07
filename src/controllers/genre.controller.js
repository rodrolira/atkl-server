// controllers/genre.controller.js
import Genre  from "../models/genre.model.js";

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "Unable to fetch genres" });
  }
};

const getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findByPk(id);
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
    const newGenre = await Genre.create({ name });
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ error: "Unable to create genre" });
  }
};

const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [updated] = await Genre.update({ name }, {
      where: { id }
    });
    if (!updated) {
      return res.status(404).json({ error: "Genre not found" });
    }
    const updatedGenre = await Genre.findByPk(id);
    res.json(updatedGenre);
  } catch (error) {
    res.status(500).json({ error: "Unable to update genre" });
  }
};

const deleteGenre = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Genre.destroy({
      where: { id }
    });
    if (!deleted) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
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