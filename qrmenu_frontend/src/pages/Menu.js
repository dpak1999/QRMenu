/** @format */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchPlace } from '../apis';
import MenuList from '../components/MenuList';

const Menu = () => {
  const [place, setPlace] = useState({});

  const params = useParams();

  const onFetchPlace = async () => {
    const res = await fetchPlace(params.id);
    if (res) {
      setPlace(res);
    }
  };

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <MenuList place={place} />
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
