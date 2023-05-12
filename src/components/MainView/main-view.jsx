import { useState, useEffect} from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {


const [movies, setMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => { fetch("https://movie-api-1000.herokuapp.com/movies")
   .then((response) => response.json())
   .then((data) => {
     const moviesFromApi = data.docs.map((doc) => {
       return{
         id: doc._id,
         description: doc.Description,
         title: doc.Title,
         image:`https://covers.openlibrary.org/b/id/${doc.ImagePath}-L.jpg`,
         director: doc.Director_Name?.[0],
         genre: doc.Genre_Name
       };
     });
     setMovies(moviesFromApi);

   });
   }, []);












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