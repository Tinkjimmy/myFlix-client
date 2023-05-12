export const MovieView = ({movie,onBackClick}) => {
  return (
    <div>
        <div>
          <img src= {movie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre_Name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director_Name}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
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