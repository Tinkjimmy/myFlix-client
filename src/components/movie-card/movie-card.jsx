import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export const MovieCard = ({ movie }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [favouriteList, setFavouriteList] = useState(user.Favourites);

  const favoriteMovie = () => {
    fetch(
      `https://movie-api-1000.herokuapp.com/users/${encodeURIComponent(
        user.Username
      )}/movies/${encodeURIComponent(movie.id)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert(`${movie.title} was added to your favourites!`);
        localStorage.setItem("user", JSON.stringify(data));
        setFavouriteList(data.Favourites);
      })
      .catch((error) => {
        // Handle error
        console.error("Error favoriting movie:", error);
      });
  };

  const deleteFavoriteMovie = () => {
    fetch(
      `https://movie-api-1000.herokuapp.com/users/${encodeURIComponent(
        user.Username
      )}/movies/${encodeURIComponent(movie.id)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert(`${movie.title} was deleted from your favourites!`);
        localStorage.setItem("user", JSON.stringify(data));
        setFavouriteList(data.Favourites);
      })
      .catch((error) => {
        // Handle error
        console.error("Error favoriting movie:", error);
      });
  };

  return (
    <Card className="h-100">
      <Card.Img className="w-100" variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="primary" onClick={favoriteMovie}>
          {favouriteList.includes(movie.id) ? "" : "Favourite"}
        </Button>
        <Button variant="primary" onClick={deleteFavoriteMovie}>
          {favouriteList.includes(movie.id) ? "Unfavourite" : ""}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movies: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  // onmovieClick: PropTypes.func.isRequiredKC
};
