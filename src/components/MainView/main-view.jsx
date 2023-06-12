import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Container } from "react-bootstrap";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  // const [favs, setFavs] = useState([false]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-api-1000.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          console.log(doc);
          return {
            id: doc._id,
            description: doc.Description,
            title: doc.Title,
            image: doc.ImagePath,
            director: doc.Director.Name,
            genre: doc.Genre.Name,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  //search
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const films = movies;

  // const favMovies = movies.filter((movie) =>
  //   user.Favourites.includes(movie.id)
  // );

  // const handleStateChange = () => {
  //   favs === true ? setFavs(false) : setFavs(true);
  // };

  //inizio return
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        // handleChange={handleStateChange}
        // favs={favs}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        searchTerm={searchTerm}
        onSearchTermChange={(value) => setSearchTerm(value)}
      />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                    // updateUser={updateUser}
                  />
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        movies={movies}
                        user={user}
                        token={token}
                        // updateUser={updateUser}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : // : favs === true ? (
                  //   <>
                  //     {favMovies.map((movie) => (
                  //       <Col className="mb-4" key={movie.id} md={3}>
                  //         <MovieCard movie={movie} />
                  //       </Col>
                  //     ))}
                  //   </>
                  // )
                  filteredMovies ? (
                    <>
                      {filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

// return (
//   <Row>
//     {!user ? (
//         <Col md={5}>
//               <LoginView
//           onLoggedIn={(user,token) => {
//             setUser(user)
//             setToken(token)
//           }} />
//               or
//               <SignupView />
//         </Col>

//     ) : selectedMovie ? (
//       <Col md={8}>
//         <MovieView
//           movie={selectedMovie}
//           onBackClick={() => setSelectedMovie(null)}
//         />
//       </Col>

//     ) : movies.length === 0 ? (
//       <div>The list is empty!</div>

//     ) : (
//       <>
//         {movies.map((movie) => (
//           <Col className="mb-5" key={movie.id} md={3}>
//           <MovieCard
//             key={movie.id}
//             movie={movie}
//             onMovieClick={(newSelectedMovie) => {
//               setSelectedMovie(newSelectedMovie);
//             }}
//           />
//           </Col>
//         ))}
//         <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>

//       </>
//     )}
//   </Row>
// );
// };
