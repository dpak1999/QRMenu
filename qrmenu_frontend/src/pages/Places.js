/** @format */

import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchPlaces } from '../apis';
import AuthContext from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';

const Place = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    transform: scale(1.05);
  }
  > div {
    background-size: cover;
    height: 200px;
    border-radius: 5px;
  }
  > p {
    margin-top: 5px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const Places = () => {
  const [places, setPlaces] = useState([]);

  const auth = useContext(AuthContext);

  const onFetchPlaces = async () => {
    const res = await fetchPlaces(auth.token);
    if (res) {
      setPlaces(res);
    }
  };

  useEffect(() => {
    onFetchPlaces();
  }, []);

  return (
    <MainLayout>
      <h3>My Places</h3>
      <Row>
        {places.map((place) => (
          <Col key={place.id} lg={4}>
            <Place>
              <div style={{ backgroundImage: `url(${place.image})` }}></div>
              <p>{place.name}</p>
            </Place>
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
};

export default Places;
