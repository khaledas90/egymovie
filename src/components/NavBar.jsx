import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

const NavBar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const [valSearch, setValSearch] = useState("");
  const [ResultSearch, setResultSearch] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useSelector((state) => state.movie.User[0]);
  const favorites = useSelector((state) => state.movie.Favorites);

  useEffect(() => {
    if (user) {
      setShowProfile(true);
      setShowUserName(true);
    }
  }, [user]);

  const handleGetReach = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${valSearch}&api_key=b861945f893a34d1bf12f51064b87a83`
      )
      .then(function (response) {
        setResultSearch(response.data.results);
        setSearchOpen(true);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching movies!",
        });
      });
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setResultSearch([]);
      setSearchOpen(false);
    } else {
      setValSearch(e.target.value);
      handleGetReach();
    }
  };
  const handleCloseSearch = () => {
    setValSearch("");
    setResultSearch([]);
    setSearchOpen(false);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          EgyMovie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Movie
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favorites
            </Nav.Link>
            {user && showProfile && (
              <Nav.Link as={Link} to="/Profile">
                Profile
              </Nav.Link>
            )}
          </Nav>
          <Form className="position-relative">
            <Form.Control
              type="search"
              placeholder="Search"
              onChange={handleSearch}
              className="SearchBar ml-2"
              aria-label="Search"
            />
            <div className={`searchbar ${searchOpen ? "open" : ""}`}>
              {ResultSearch.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/MoviesDetails/${movie.id}`}
                  onClick={handleCloseSearch}
                >
                  <span className="d-flex align-items-center p-3 bg-white m-3">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="imgSearch"
                      alt={movie.title}
                    />
                    <p className="titleSearch">{movie.title}</p>
                  </span>
                </Link>
              ))}
            </div>
          </Form>
          {user && showUserName ? (
            <span className="d-flex align-items-center p-1">
              <FontAwesomeIcon
                className="iconFavoriteNumbers ml-2"
                icon={faHeart}
              />
              <p className="mb-4 h5 fa-bold">{favorites.length}</p>
              <p className="ml-3 hiUser">Hi, {user.Name}</p>
            </span>
          ) : (
            <Nav.Link
              as={Link}
              style={{ marginRight: "20px", marginLeft: "20px" }}
              to="/Register"
            >
              <Button
                as="input"
                type="button"
                className="btnRegister mr-2"
                value="Register"
              />
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
