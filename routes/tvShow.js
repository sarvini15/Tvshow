const express = require("express");

// create express router for tvShow
const router = express.Router();

// load all the models
// const Movie = require("../models/movies");
const TvShow = require("../models/tvShow");

router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;

    let tvShow = [];
    if (genre) {
      tvShow = await TvShow.find({ genre: genre });
    } else if (rating) {
      tvShow = await TvShow.find({ rating: { $gt: rating } });
    } else if (premiere_year) {
      tvShow = await TvShow.find({ premiere_year: { $gt: premiere_year } });
    }
    res.status(200).send(tvShow);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tvShow = await TvShow.findById(req.params.id);
    res.status(200).send(tvShow);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
// export default router;
