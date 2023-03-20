require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
let Movie = require("./model/Movie.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const { MONGO_URL, PORT = 3002 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}


app.post("/favourites", (req, res) => {
  const film = req.body;
  const title = film.Title;
  const year = film.Year;
  const genre = film.Genre;
  const plot = film.Plot;
  const actors = film.Actors;
  const writers = film.Writer;
  const directors = film.Director;
  const type = film.Type;
  const rating = film.imdbRating;
  const runtime = film.Runtime;
  const poster = film.Poster;
  const movie = new Movie({
    title: title,
    year: year,
    genre: genre,
    plot: plot,
    actors: actors,
    writers: writers,
    directors: directors,
    type: type,
    rating: rating,
    runtime: runtime,
    poster: poster,
  });
  movie
    .save()
    .then((movie) => res.json(movie))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

app.get("/favourites", async (req, res) => {
  const filmsOnMyList = await Movie.find();
  res.status(200).send(filmsOnMyList);
});

app.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  await Movie.findOneAndDelete({ _id: id });
  res.status(202).send("deleted");
});

app.put("/edit/:id", async (req, res) => {
  let id = req.params.id;
  await Movie.findOneAndUpdate({ _id: id }, { seen: "Yes" });
  res.status(202).send("updated");
});

mongoose
  .connect(
    MONGO_URL
  )
  .then(() => console.log("Megy vagy nem megy?"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("Server runs on port 3002"));
