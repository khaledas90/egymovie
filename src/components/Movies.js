import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import axiosInstance from "../api_init/Api-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  AddFavorite,
  moviesAll,
  NextPage,
  PrevPage,
} from "../Redux/MovieSlice";
import Alert from "react-bootstrap/Alert";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const pages = useSelector((state) => state.movie.pages);
  const user = useSelector((state) => state.movie.User);
  const favorites = useSelector((state) => state.movie.Favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get(`/popular`, {
          params: { page: pages },
        });
        setMovies(response.data.results);
        const ArrayAllmovies = response.data.results.map((obj) => {
          return { ...obj };
        });
        dispatch(moviesAll(ArrayAllmovies));
      } catch (error) {
        console.error("Error fetching movies:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching movies!",
        });
      }
    };

    fetchMovies();
  }, [dispatch, pages]);

  const handleNextPage = () => {
    dispatch(NextPage());
  };

  const handlePrevPage = () => {
    if (pages > 1) {
      dispatch(PrevPage());
    }
  };

  const handleAddFavorite = (movie) => {
    if (!user.length) {
      Swal.fire({
        icon: "error",
        title: "You must register first to add favorites",
        confirmButtonText: "Ok",
      });
    } else {
      if (favorites.some((favMovie) => favMovie.id === movie.id)) {
        Swal.fire({
          icon: "info",
          title: "Movie already in favorites",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Movie add to favorites successfully",
          confirmButtonText: "Ok",
        });
        dispatch(AddFavorite(movie));
      }
    }
  };

  return (
    <Row xs={1} md={2} lg={4} className="g-4 m-4">
      <Col lg={12} md={12} sm={12} className="mt-3">
        {!user.length && (
          <Alert variant="warning">
            You cannot add any movie to favorites before{" "}
            <b>registering first</b>
          </Alert>
        )}
      </Col>
      {movies.map((movie) => (
        <Col key={movie.id}>
          <Card className="movies">
            <div className="icons">
              <span className="vote">{movie.vote_average.toFixed(1)}</span>
              <span>
                <FontAwesomeIcon
                  onClick={() => handleAddFavorite(movie)}
                  className="iconFavorite"
                  icon={faHeart}
                />
              </span>
            </div>
            <Link to={`/MoviesDetails/${movie.id}`}>
              <Card.Img
                variant="top"
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title className="text-center">{movie.title}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}

      <Col lg={12}>
        <div className="btns text-center g-5">
          <button
            type="button"
            onClick={handlePrevPage}
            className="btn btn-light mr-5"
            disabled={pages === 1}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            className="btn btn-primary ml-5"
          >
            Next
          </button>
        </div>
      </Col>
    </Row>
  );
}
