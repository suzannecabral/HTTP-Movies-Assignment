import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';


// custom styling:
// material colors: Red A 700
// rgba(213, 0, 0, 1)
// icon: fa film

//primary: d50000
//light: ff5131
//dark: 9b0000


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <header>
        <h1>Lambda Movie Selector</h1>
        <nav>
          <div>
          </div>
        </nav>
      </header>
      <div className="contentWrapper">
        <SavedList list={savedList} />

        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>

        <Route path="/movies/:id">
          <Movie addToSavedList={addToSavedList} />
        </Route>
      </div>
    </>
  );
};

export default App;
