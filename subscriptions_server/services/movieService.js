const {
  switchMonthDayInDateString,
  UTCDateStringToISTDateString,
} = require("../utils/utils");
const Movie = require("../models/MovieModel");

const getAllMovies = (query) => {
  return new Promise((resolve, reject) => {
    Movie.find(query, (err, movies) => {
      if (err) {
        reject(err);
      } else {
        resolve(movies);
      }
    }); //.limit(50); // TODO: delete
  });
};

const getMovieById = (id) => {
  return new Promise((resolve, reject) => {
    Movie.findById(id, (err, movie) => {
      if (err) {
        reject(err);
      } else {
        resolve(movie);
      }
    });
  });
};

const addMovie = (newMovie) => {
  return new Promise((resolve, reject) => {
    // I use date format d/m/y and Javascript use m/d/y:
    newMovie.premiered = switchMonthDayInDateString(newMovie.premiered);
    const newMovieDoc = new Movie(newMovie);
    newMovieDoc.save((err, movie) => {
      if (err) {
        reject(err);
      } else {
        resolve(movie);
      }
    });
  });
};

const updateMovie = (id, movieChanges) => {
  return new Promise((resolve, reject) => {
    if (movieChanges.premiered) {
      // I use date format d/m/y and Javascript use m/d/y:
      movieChanges.premiered = switchMonthDayInDateString(
        movieChanges.premiered
      );
    }
    Movie.findByIdAndUpdate(id, movieChanges, (err, movie) => {
      if (err) {
        reject(err);
      } else {
        resolve(movie);
      }
    });
  });
};

const deleteMovie = (id) => {
  return new Promise((resolve, reject) => {
    Movie.findByIdAndDelete(id, (err, movie) => {
      if (err) {
        reject(err);
      } else {
        resolve(movie);
      }
    });
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    Movie.remove({}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  deleteAll,
};
