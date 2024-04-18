const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tvShowSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  premiere_year: { type: Number, required: true },
  end_year: { type: Number },
  seasons: { type: Number, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
});

const TvShow = model("TvShow", tvShowSchema);
module.exports = TvShow;
