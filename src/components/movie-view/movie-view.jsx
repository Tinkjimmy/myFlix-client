import PropTypes from "prop-types";
export const MovieView = ({movie,onBackClick}) => {
  return (
    <div>
        <div>
          <span>genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>genreDescription: </span>
          <span>{movie.Genre.Description}</span>
        </div>
        <div>
          <span>director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>directorBio: </span>
          <span>{movie.Director.Bio}</span>
        </div>
        <div>
          <span>directorBirth: </span>
          <span>{movie.Director.Birth}</span>
        </div>
        <div>
          <span>directorDeath: </span>
          <span>{movie.Director.Death}</span>
        </div>
        <div>
          <span>actors: </span>
          <span>{movie.Actors}</span>
        </div>
        <div>
          <span>id: </span>
          <span>{movie._id}</span>
        </div>
        <div>
          <span>title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>featured: </span>
          <span>{movie.Featured}</span>
        </div>

        <button onClick={onBackClick}>Back</button>
        <div>
      <img src= {movie.ImagePath} />
    </div>
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