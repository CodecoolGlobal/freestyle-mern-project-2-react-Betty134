import React from "react";

function Film(props) {
  //console.log(props);
  return (
    <div className="movie">
      <h1>Title: {props.title}</h1>
      <h2>Year of release: {props.year}</h2>
      <h2>Type: {props.type}</h2>
      <img src={props.poster} alt="poster" />
    </div>
  );
}

export default Film;
