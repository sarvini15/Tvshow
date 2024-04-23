// load all the models
const TvShow = require("../models/tvShow");

const getTvShow = async (genre, rating) => {
  try {
    let tvShow = [];
    if (genre) {
      tvShows = await TvShow.find({ genre: genre });
    } else if (rating) {
      tvShows = await TvShow.find({ rating: { $gt: rating } });
    } else {
      tvShows = await TvShow.find();
    }
    console.log("controller", tvShows);
    return tvShows;
  } catch (error) {
    throw new Error(error);
  }
};

// add
const addTvShow = async (
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  // create new TvShow
  const newTvShow = new TvShow({
    title,
    creator,
    premiere_year,
    end_year,
    seasons,
    genre,
    rating,
  });
  // save the tvshow with mongodb
  await new TvShow.save();
};

// update
const updateTvShow = async (
    tvShow_id,
    title,
    creator,
    premiere_year,
    end_year,
    genre,
    rating
) => {
    const updateTvShow = await TvShow.findByIdAndUpdate(
        tvShow_id,
        {
            title,
            creator,
            premiere_year,
            end_year,
            genre,
            rating
        },
        { new: true } // send in the updated data
    );

    return updateTvShow;
};

module.exports = {
    getTvShow,
    addTvShow,
    updateTvShow,

};
