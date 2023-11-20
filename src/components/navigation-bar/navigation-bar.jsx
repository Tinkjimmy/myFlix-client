import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({
  user,
  onLoggedOut,
  handleChange,
  favs,
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            <Button onClick={handleChange}>
              {favs === false ? "Just favorites" : "All movies"}
            </Button>

            {user && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
              </>
            )}

            {user && (
              <>
                <Nav.Link as={Link} to="/"></Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Form>
                  <div className="search-bar">
                    <FormControl
                      type="text"
                      placeholder="Search movies..."
                      value={searchTerm}
                      onChange={(e) => onSearchTermChange(e.target.value)}
                    />
                  </div>
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
