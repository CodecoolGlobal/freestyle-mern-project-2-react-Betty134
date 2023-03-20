import React from "react";

function MyList(props) {
  return (
    <>
      <h1>Title: {props.title}</h1>
      <p><strong>Year of release: </strong>{props.year}</p>
      <p><strong>Genre: </strong>{props.genre}</p>
      <p><strong>Story: </strong>{props.plot}</p>
      <p><strong>Actors: </strong>{props.actors}</p>
      <p><strong>Writers: </strong>{props.writers}</p>
      <p><strong>Directors: </strong>{props.directors}</p>
      <p><strong>Type: </strong>{props.type}</p>
      <p><strong>Rating: </strong>{props.rating}</p>
      <p><strong>Runtime: </strong>{props.runtime}</p>
      <img src={props.poster} alt="poster" />
      <p><strong>Seen: </strong>{props.seen}</p>
    </>
  );
}

export default MyList;
