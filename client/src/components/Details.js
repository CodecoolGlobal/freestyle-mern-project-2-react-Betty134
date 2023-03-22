import React from "react";

export default function Details(props) {

  //const [visible, setVisible] = useState(true);

  const handleHideDetails = (event) => {
    props.setVisible(false)
  }

  return (
    < div className="details" >
      {props.visible &&
        (<>
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
          <button onClick={handleHideDetails}>Hide details</button>
          
        </>
        )
      }
    </div >
  );
}

