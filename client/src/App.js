import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Film from "./Film.js";
import MyList from "./MyList";
import Details from "./Details";
import Footer from "./Footer";
import Header from "./Header";
import Snackbar from "./components/Snackbar";

function App() {
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState([]);
  const [details, setDetails] = useState({});
  const [myList, setMyList] = useState([]);
  const [showTheList, setShowTheList] = useState(false);
  const [visible, setVisible] = useState();

  //   function snackbar(){
  //   let x = document.getElementById("snackbar");

  //   x.className = "show";

  //   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  // }


  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target.value);
    console.log(event.target);
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

  const handleFavourites = async (e) => {
    //add to the Mongo DB collection
    // console.log("We have to do something with this stuff");
    // console.log(details);
    snackbarRef.current.show()

    console.log(e.target)
    const actualDetails = await getDetails(e)   // itt várjuk meg a return data -t, olyan mintha az utolsó then lenne

    // getDetails(e).then(actualDetails => {
    // fetch("http://localhost:3002/favourites", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(actualDetails),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // })

    fetch("http://localhost:3002/favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualDetails),
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
    setVisible(true)
    console.log('DETAILS', e.target)
    console.log(e.target.dataset.id)

    let url = `https://www.omdbapi.com/?apikey=d9870200&i=${e.target.dataset.id}`;

    console.log('DETAIL URL', url)

    return fetch(url) // --> film details
      .then((res) => {
        if (res.ok) {
          console.log("successful get");
        } else {
          console.log("failed");
        }
        return res;   // ugyan azt viszi tovább
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetails(data);
        return data   // ez a data lesz a következő then bemenete
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

  // const SnackbarType = {
  //   success: 'success',
  //   fail: 'fail',
  // };

  const snackbarRef = useRef(null);

  return (
    <div className="App">
      <Header />
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
                placeholder="movie title"
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
                  // onClick={() => {getDetails(); handleFavourites(); }}
                  data-id={film.imdbID}
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
                    visible={visible}
                    setVisible={setVisible}
                  />
                ) : null}
                <hr></hr>
              </div>
            ))}
        </>
      )}
      <button className="showSnack" onClick={() => {snackbarRef.current.show()}}> Show SnackBar</button>
      <Snackbar 
        ref={snackbarRef}
        message='Successfully added to your wishlist' 
        // type={SnackbarType.success} 
        type="success" 
      />

      <Footer />
      {/* <div className="snackbar">Successfuly added to wish list!</div> */}
     
    </div>
  );
}

export default App;
