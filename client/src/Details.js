import React from "react";

export default function Details(props) {
  return (
    <div className="details">
      <strong>Actors:</strong> {props.actors}
      <br></br>
      <strong>Director:</strong> {props.directors}
      <br></br>
      <strong>Genre:</strong> {props.genre} <br></br>
      <strong>Plot:</strong> {props.plot}
      <br></br>
      <strong>Runtime:</strong> {props.runtime}
      <br></br>
      <strong>Type:</strong> {props.type}
      <br></br>
      <strong>Writer:</strong> {props.writers}
      <br></br>
      <strong>imdb rating:</strong> {props.rating}
      <br></br>
    </div>
  );
}
