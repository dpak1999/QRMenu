/** @format */

import { Button, Col, Container, Image, Jumbotron, Row } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <Jumbotron className="bg-light">
        <Container>
          <Row>
            <Col md={6} className="my-auto">
              <h1>
                <strong>QR Menu</strong>
              </h1>
              <h5 className="mt-4 mb-4">
                A smart way to share you menu in a QR Code with your customers
              </h5>
              <br />
              <Button href="/places" variant="standard" size="lg">
                Create you menu
              </Button>
            </Col>
            <Col md={6}>
              <Image
                rounded
                fluid
                src="https://res.cloudinary.com/snazzycave/image/upload/v1635192665/qr_menu/restog_m9fjmc.gif"
              />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </MainLayout>
  );
};

export default Home;
