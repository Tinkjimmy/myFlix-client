// import { useState } from "react";
// import { Card, Col, Form, Button } from "react-bootstrap";
// import { MovieCard } from "../movie-card/movie-card";

// export const ProfileView = ({
//   user,
//   token,
//   movies,
//   onLoggedOut,
//   updateUser,
// }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [birthdate, setBirthdate] = useState("");

//   let favoriteMovies = movies.filter((movie) =>
//     user.Favourites.includes(movie._id)
//   ); //possible error

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const data = {
//       username,
//       password,
//       email,
//       birthdate,
//     };

//     fetch(`https://movie-api-1000.herokuapp.com/users/:Username`, {
//       method: "PUT",
//       body: JSON.stringify(data),
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           alert("Changing userdata failed");
//           return false;
//         }
//       })
//       .then((user) => {
//         if (user) {
//           alert("Successfully changed userdata");
//           updateUser(user);
//         }
//       })
//       .catch((e) => {
//         alert(e);
//       });
//   };

//   const deleteAccount = () => {
//     fetch(`https://movie-api-1000.herokuapp.com/users/:Username`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert("Account deleted");
//           onLoggedOut();
//         } else {
//           alert("Not deleted");
//         }
//       })
//       .catch((e) => {
//         alert(e);
//       });
//   };

//   return (
//     <>
//       <Col md={6}>
//         <Card className="mt-2 mb-3">
//           <Card.Body>
//             <Card.Title>Your info</Card.Title>
//             <p>Username: {user.username}</p>
//             <p>Email: {user.email}</p>
//             <p>Birthdate: {user.birthdate}</p>
//           </Card.Body>
//         </Card>
//         <Button
//           variant="danger"
//           onClick={() => {
//             if (confirm("Are you sure?")) {
//               deleteAccount();
//             }
//           }}
//         >
//           Delete user account
//         </Button>
//       </Col>
//       <Col md={6}>
//         <Card className="mt-2 mb-3">
//           <Card.Body>
//             <Card.Title>Update your info</Card.Title>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group>
//                 <Form.Label>Username:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   minLength="5"
//                   className="bg-light"
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Password:</Form.Label>
//                 <Form.Control
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength="8"
//                   className="bg-light"
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Email:</Form.Label>
//                 <Form.Control
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="bg-light"
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Birthdate:</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={birthdate}
//                   onChange={(e) => setBirthdate(e.target.value)}
//                   required
//                   className="bg-light"
//                 />
//               </Form.Group>
//               <Button className="mt-3" variant="primary" type="submit">
//                 Submit
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Col>
//       <Card>
//         <Col md={12}>
//           <h3 className="mt-3 mb-3 ">Your favorite movies:</h3>
//         </Col>
//         {favoriteMovies.map((movie) => (
//           <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
//             <MovieCard movie={movie} />
//           </Col>
//         ))}
//       </Card>
//     </>
//   );
// };

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

  let favoriteMovies = movies.filter((movie) =>
    user.Favourites.includes(movie._id)
  ); //possible error

  const getUser = () => {
    // NOTE: user.Username is grabbed from the user prop that main-view send to this component
    fetch(`https://movie-api-1000.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((userInfo) => {
        setUsername(user.Username);
        setPassword(user.Password);
        setEmail(user.Email);
        setBirthdate(user.Birth);
      });
  };

  // NOTE: When the component loads, getUser will run automatically with this code
  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
      email,
      birthdate,
    };

    // FIX: Update using template literal syntax like I have used for the getUser function
    fetch(`https://movie-api-1000.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // FIX: Set state of Username, Password, Email, Birth and update localstorage as well
          return response.json();
        } else {
          alert("Changing userdata failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully changed userdata");
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const deleteAccount = () => {
    // FIX: Update using template literal syntax
    fetch(`https://movie-api-1000.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          // FIX: Remove all localstorage information and redirect to homepage if needed
          alert("Account deleted");
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
        {favoriteMovies.map((movie) => (
          <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Card>
    </>
  );
};
