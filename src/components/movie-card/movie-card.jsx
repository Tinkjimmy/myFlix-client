import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
  return ( 
    <div  onClick={() => {onMovieClick(movie);}}>
      {movie.title}
    </div>
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
    onBookClick: PropTypes.func.isRequired
  };