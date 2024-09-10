// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Favorites from "./components/Favorites";
import Movies from "./components/Movies";
import Register from "./components/Register";
import MoviesDetails from "./components/MoviesDetails";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/MoviesDetails/:id" element={<MoviesDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
