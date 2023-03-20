const express = require('express');

const router = express.Router();

const {
    getCinema,
    postCinema,
    putCinema,
    deleteCinema

} = require('../controllers/cinema.controller');

router.get("/", getCinema);
router.post("/", postCinema);
router.put("/", putCinema);
router.delete("/", deleteCinema);

module.exports = router;