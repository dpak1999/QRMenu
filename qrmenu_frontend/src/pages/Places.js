/** @format */

import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Modal, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchPlaces } from '../apis';
import PlaceForm from '../components/PlaceForm';
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

const AddPlaceButton = styled.div`
  border: 1px dashed grey;
  height: 200px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  :hover {
    background-color: #fbfbfb;
  }
`;

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [show, setShow] = useState(false);

  const auth = useContext(AuthContext);
  const history = useHistory();

  const onFetchPlaces = async () => {
    const res = await fetchPlaces(auth.token);
    if (res) {
      setPlaces(res);
    }
  };

  const onHide = () => setShow(false);
  const onShow = () => setShow(true);

  const onDone = () => {
    onFetchPlaces();
    onHide();
  };

  useEffect(() => {
    onFetchPlaces();
  }, []);

  return (
    <MainLayout>
      <h3>My Places</h3>

      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          <PlaceForm onDone={onDone} />
        </Modal.Body>
      </Modal>

      <Row>
        {places.map((place) => (
          <Col key={place.id} lg={4}>
            <Place onClick={() => history.push(`/places/${place.id}`)}>
              <div style={{ backgroundImage: `url(${place.image})` }}></div>
              <p>{place.name}</p>
            </Place>
          </Col>
        ))}
        <Col lg={4}>
          <AddPlaceButton onClick={onShow}>Add new place</AddPlaceButton>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Places;
