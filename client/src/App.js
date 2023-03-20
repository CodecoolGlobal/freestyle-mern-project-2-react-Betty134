import "./App.css";
import React, { useState, useEffect } from "react";
import Film from "./Film.js";
import MyList from "./MyList";
import Details from "./Details";
import Footer from "./Footer";

function App() {
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState([]);
  const [details, setDetails] = useState({});
  const [myList, setMyList] = useState([]);
  const [showTheList, setShowTheList] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target.value);
    // console.log(event.target);
    console.log(title);
    if (title.length < 5) {
      fetch("http://www.omdbapi.com/?apikey=d9870200&t=" + title) // --> film
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setMovie([data]);
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      fetch("http://www.omdbapi.com/?apikey=d9870200&s=" + title) // --> films
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setMovie(data.Search);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  const handleFavourites = () => {
    //add to the Mongo DB collection
    // console.log("We have to do something with this stuff");
    // console.log(details);
    fetch("http://localhost:3002/favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDetails = (e) => {
    let url = `https://www.omdbapi.com/?apikey=d9870200&i=${e.target.dataset.id}`;

    fetch(url) // --> film details
      .then((res) => {
        if (res.ok) {
          console.log("successful get");
        } else {
          console.log("failed");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowButton = (event) => {
    console.log("somewhere we have to show the list");
    //navigateToFavourites();
    getMyList();
    setShowTheList(true);
  };

  const getMyList = () => {
    fetch("http://localhost:3002/favourites")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyList(data);
      })
      .catch((err) => console.log(err));
  };

  const handleBackButton = (event) => {
    //console.log("somewhere we have to show the list");
    //navigateToFavourites();
    setShowTheList(false);
  };

  const handleWatchedButton = (event) => {
    console.log(event.target.dataset.id);
    let url = "http://localhost:3002/edit/" + event.target.dataset.id;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("successful update");
        } else {
          console.log("update failed");
        }
        return res;
      })
      .then(getMyList)
      .catch((err) => console.log(err));
  };

  const handleDeleteButton = (event) => {
    console.log(event.target.dataset.id);
    let url = "http://localhost:3002/delete/" + event.target.dataset.id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("DELETE request was successful");
        } else {
          console.log("DEL request failed");
        }
        return res;
      })
      .then(getMyList)
      .catch((err) => console.log(err));
  };

  const [scrollTop, setScrollTop] = useState(false);
  // görgetésre aktiválódjon
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    });
  }, []);

  const bottomToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <header>Freestyle MERN TWT's Rainy Day Program Planner</header>
      {scrollTop && (
        <button onClick={bottomToTop} className="backToTop">
          ↑
        </button>
      )}
      {showTheList ? (
        <>
          <button type="button" onClick={handleBackButton}>
            Back
          </button>
          <hr></hr>
          {myList.map((film, index) => (
            <div key={index}>
              <MyList
                title={film.title}
                year={film.year}
                genre={film.genre}
                plot={film.plot}
                actors={film.actors}
                writers={film.writers}
                directors={film.directors}
                type={film.type}
                rating={film.rating}
                runtime={film.runtime}
                poster={film.poster}
                seen={film.seen}
              />{" "}
              <button
                type="button"
                onClick={handleDeleteButton}
                data-id={film._id}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handleWatchedButton}
                data-id={film._id}
              >
                Watched it
              </button>
              <hr></hr>
            </div>
          ))}
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              Search for this movie:
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder = "movie title"
              />
            </label>
            <button type="submit">Search!</button>
            <button type="button" onClick={handleShowButton}>
              Show my wish list
            </button>
          </form>
          <hr></hr>
          {movie &&
            movie.map((film, index) => (
              <div key={index}>
                <Film
                  title={film.Title}
                  year={film.Year}
                  poster={film.Poster}
                  type={film.Type}
                />
                <button
                  type="button"
                  className="favButton"
                  onClick={handleFavourites}
                >
                  Add to my wish list
                </button>
                <button
                  type="button"
                  onClick={getDetails}
                  data-id={film.imdbID}
                >
                  Details
                </button>
                {details.imdbID === film.imdbID ? (
                  <Details
                    actors={details.Actors}
                    genre={details.Genre}
                    plot={details.Plot}
                    writers={details.Writer}
                    directors={details.Director}
                    type={details.Type}
                    rating={details.imdbRating}
                    runtime={details.Runtime}
                  />
                ) : null}
                <hr></hr>
              </div>
            ))}
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
