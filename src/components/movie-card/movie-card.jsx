import PropTypes from "prop-types";
import {Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card  className="h-100">
      <Card.Img className = "w-100" variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

  MovieCard.propTypes ={
    movies: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string.isRequired,
      director: PropTypes.string,
      genre: PropTypes.string
    }).isRequired,
    onmovieClick: PropTypes.func.isRequired
  };