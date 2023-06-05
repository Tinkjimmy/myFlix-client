import React from "react";
import { useState, useEffect } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  updateUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getUser = () => {
    // NOTE: user.Username is grabbed from the user prop that main-view send to this component
    fetch(
      `https://movie-api-1000.herokuapp.com/users/${
        JSON.parse(localStorage.getItem("user")).Username
      }`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((userInfo) => {
        setUsername(userInfo.Username);
        setPassword(userInfo.Password);
        setEmail(userInfo.Email);
        setBirthdate(userInfo.Birth);
        setFavourites(userInfo.Favourites);
      });
  };

  // NOTE: When the component loads, getUser will run automatically with this code
  useEffect(() => {
    getUser();
  }, []);

  let favMovies = movies.filter((movie) => favourites.includes(movie._id));

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUserInfo = {
      Username: username,
      Password: password,
      Email: email,
      Birth: birthdate,
    };

    fetch(
      `https://movie-api-1000.herokuapp.com/users/${
        JSON.parse(localStorage.getItem("user")).Username
      }`,
      {
        method: "PUT",
        body: JSON.stringify(newUserInfo),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "HTTP request failed with status code: " + response.status
          );
        }
      })
      .then((userInfo) => {
        alert("user updated!");
        console.log("updatedUser", userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUsername(userInfo.Username);
        setPassword(userInfo.Password);
        setEmail(userInfo.Email);
        setBirthdate(userInfo.Birth);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  const deleteAccount = () => {
    fetch(
      `https://movie-api-1000.herokuapp.com/users/${
        JSON.parse(localStorage.getItem("user")).Username
      }`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          // FIX: Remove all localstorage information and redirect to homepage if needed
          alert("Account deleted");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          onLoggedOut();
        } else {
          alert("Not deleted");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Col md={6}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title>Your info</Card.Title>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Birthdate: {birthdate}</p>
          </Card.Body>
        </Card>
        <Button
          variant="danger"
          onClick={() => {
            if (confirm("Are you sure?")) {
              deleteAccount();
            }
          }}
        >
          Delete user account
        </Button>
      </Col>

      <Col md={6}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title>Update your info</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                  className="bg-light"
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Card>
        <Col md={12}>
          <h3 className="mt-3 mb-3 ">Your favorite movies:</h3>
        </Col>
        <ul>
          {/* i tried to map favMovies, which should contain all the movies that
          matched the ids in "favourites" state */}
          {/* {favMovies.map((movie) => (
            <li>{movie.title}</li>
          ))} */}

          {/* the only one that kind of works, but it only shows the ids of
          user.Favourites */}
          {favourites.map((id) => (
            <li>{id}</li>
          ))}

          {/* i tried to compare the ids in the favourites state with each id of
          movies an create an "li" element if they matched */}
          {/* {favourites.map((id) =>
            movies.map((movie) => {
              movie._Id === id && <li>{movie.Title}</li>;
            })
          )} */}
        </ul>
      </Card>
    </>
  );
};
