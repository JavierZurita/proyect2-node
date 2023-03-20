const express = require('express');

const router = express.Router();

const {
    getMovie,
    getMovieById,
    getMovieByTitle,
    getMovieByGenre,
    getMovieByYear,
    postMovie,
    putMovie,
    deleteMovie

} = require('../controllers/movie.controller');

router.get("/", getMovie);
router.get("/genre/:genre", getMovieByGenre);
router.get("/title/:title", getMovieByTitle);
router.get("/id/:id", getMovieById);
router.get("/year/:year", getMovieByYear);
router.post("/", postMovie);
router.put("/", putMovie);
router.delete("/", deleteMovie);


module.exports = router;