import React, { Fragment } from "react";
import Alert from "react-bootstrap/Alert";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { RemoveFavorites } from "../Redux/MovieSlice";

export default function Favorites() {
  const user = useSelector((state) => state.movie.User);
  const favorites = useSelector((state) => state.movie.Favorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (id) => {
    console.log(id);
    dispatch(RemoveFavorites(id));
  };

  return (
    <Fragment>
      <div className="Favorites">
        <div className="container">
          {!user.length ? (
            <Alert className="mt-5" variant="danger">
              You cannot add any movie to Favorites before <b>Register first</b>
            </Alert>
          ) : !favorites.length ? (
            <Alert className="mt-5" variant="info">
              There is nothing in your favorites
            </Alert>
          ) : (
            <Row xs={1} md={2} lg={4} className="g-4 m-4">
              {favorites.map((movie) => (
                <Col key={movie.id}>
                  <Card className="movies">
                    <div className="icons">
                      <span className="vote">
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <span>
                        <FontAwesomeIcon
                          onClick={() => handleRemoveFavorite(movie.id)}
                          className="iconFavorite"
                          icon={faTrash}
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
                        <Card.Title className="text-center">
                          {movie.title}
                        </Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </Fragment>
  );
}
