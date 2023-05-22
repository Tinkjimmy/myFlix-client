import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({movie,onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <button onClick={onBackClick}  className="back-button" style={{ cursor: "pointer" }}>
        Back
        </button>
    </div>
  );
};

  MovieView.propTypes ={
    movies: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string.isRequired,
      director: PropTypes.string,
      genre: PropTypes.string
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };