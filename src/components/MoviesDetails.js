import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axiosInstance from "../api_init/Api-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { AddFavorite } from "../Redux/MovieSlice";

export default function Movies() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const user = useSelector((state) => state.movie.User);
  const favorites = useSelector((state) => state.movie.Favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get(`/${id}`)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
          title: "Movie added to favorites successfully",
          confirmButtonText: "Ok",
        });
        dispatch(AddFavorite(movie));
      }
    }
  };

  if (!movie) {
    return (
      <div className="load">
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
      </div>
    );
  }

  return (
    <div
      className="movieDetails"
      style={{
        background: `#181A1C url(https://image.tmdb.org/t/p/w500${movie.backdrop_path}) no-repeat center/cover`,
      }}
    >
      <div className="container">
        <Row xs={1} md={2} className="g-4 m-4">
          <Col lg={4} key={movie.id}>
            <Card
              className="movies card-overlay"
              style={{
                background: `#181A1C url(https://image.tmdb.org/t/p/w500${movie.backdrop_path}) no-repeat center/cover`,
              }}
            >
              <div className="icons">
                <span className="vote">{movie.vote_average.toFixed(1)}</span>
                <span>
                  <FontAwesomeIcon
                    className="iconFavorite"
                    onClick={() => handleAddFavorite(movie)}
                    icon={faHeart}
                  />
                </span>
              </div>
              <Card.Img
                variant="top"
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </Card>
          </Col>
          <Col lg={8}>
            <div className="detail">
              <div className="content">
                <h1>{movie.title}</h1>
                <div className="iconsDetail mt-5">
                  <div className="Vote">
                    <span className="text-wight">User Score</span>
                    <span className="voteDetail text-dark">
                      {movie.vote_average.toFixed(1)}{" "}
                    </span>{" "}
                  </div>

                  <div className="d-flex align-items-center">
                    <span className="mr-2">Add to Favorites</span>
                    <FontAwesomeIcon
                      className="iconFavoriteDetail ml-2"
                      onClick={() => handleAddFavorite(movie)}
                      icon={faHeart}
                    />
                  </div>
                </div>
                <div className="language mt-2">
                  Language: <span>{movie.original_language}</span>
                </div>
                <div className="language mt-4 mb-4">
                  Country: <span>{movie.origin_country}</span>
                </div>
                <div className="Overview">
                  <h3>Overview</h3>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
