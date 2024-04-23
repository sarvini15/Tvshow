const express = require("express");

const {
  getTvshow,
  addTvShow,
  updateTvShow,
  deleteTvShow,
} = require("../controllers/tvShow");

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
    } else {
      tvShow = await TvShow.find();
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

// POST
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.genre;
    const newTvShow = await addTvShow(
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    //  put addTvshow function here
    res.status(200).send(newTvShow);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.genre;
    const updatedTvShow = await updatedTvShow(
      tvShow_id,
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );

    res.status(200).send(updatedTvShow);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const tvShow_id = req.params.id;
    await TvShow.findByIdAndDelete(tvShow_id);
    res.status(200).send("Tv Show has been successfully deleted.");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
// export default router;
