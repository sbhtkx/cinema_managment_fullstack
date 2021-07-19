const { json } = require("express");
const express = require("express");
const movies = require("../services/movieService");

const router = express.Router();

const keys = ["_id", "genres", "name", "image", "premiered"];

router.route("/").get(async (req, res) => {
  try {
    const query = {};
    keys.forEach((key) => {
      if (req.query[key]) {
        query[key] = req.query[key];
      }
    });
    return res.json(await movies.getAllMovies(query));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await movies.getMovieById(id));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newMovie = req.body;
    return res.json(await movies.addMovie(newMovie));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const movieChanges = req.body;
    return res.json(await movies.updateMovie(id, movieChanges));
  } catch (er) {
    return res.json(er);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await movies.deleteMovie(id));
  } catch (er) {
    return res.json(er);
  }
});

module.exports = router;
