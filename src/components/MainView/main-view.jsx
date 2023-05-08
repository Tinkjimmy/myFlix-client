import { useState} from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {


const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Interstellar",
      description:"Astronauts embark on a mind-bending space mission to save humanity from a dying Earth.",
      image:
        "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
      director: "Christopher Nolan",
      genre: "sci-fi"
    },
    {
      id: 2,
      title: "Shrek",
      description:"An ogre's hilarious journey to rescue a princess with the help of his witty sidekick, Donkey.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/7/7b/Shrek_%282001_animated_feature_film%29.jpg",
      director: "Vicky Jenson",
      genre: "comedy"
    },
    {
      id: 3,
      title: "Flubber",
      description:"A quirky scientist invents a bouncy substance that leads to chaotic adventures and unexpected consequences.",
      image:
        "https://cdn.s7.shopdisney.eu/is/image/DisneyStoreES/466043420388-2?fmt=jpeg&qlt=90&wid=652&hei=652&defaultImage=no-image-it_it",
      director: "Les Mayfield",
      genre: "comedy"
    }
    
  ]);
const [selectedMovie, setSelectedMovie] = useState(null);

 if (selectedMovie) {
   return ( <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
   );
 }

 if (movies.length === 0) {
    return <div>The list is empty!</div>;
 }

return (
    <div>
      
      {movies.map((movie) => 
          (<MovieCard 
            key={movie.id}
            movie = {movie} 
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
          }}
        />
       ))}
    </div>
  );
}