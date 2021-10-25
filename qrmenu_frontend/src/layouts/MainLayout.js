/** @format */

import { Container, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const history = useHistory();

  const onSignIn = () => {
    history.replace('/login');
  };

  const goToPlaces = () => {
    history.push('/places');
  };

  return (
    <>
      <Navbar bg="light" variant="light" className="mb-4">
        <Navbar.Brand href="/">QR MENU</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={goToPlaces}>Places</Nav.Link>
        </Nav>
        <Nav className="flex-grow-1 justify-content-end">
          <Nav.Link onClick={onSignIn}>Login</Nav.Link>
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
