const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: String,
  year: String,
  genre: String,
  plot: String,
  actors: String,
  writers: String,
  directors: String,
  type: String,
  rating: String,
  runtime: String,
  poster: String,
  seen: {
    type: String,
    default: "Not yet",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
