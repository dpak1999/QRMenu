/** @format */

import { useEffect, useContext, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthContext from '../context/AuthContext';
import { fetchPlace } from '../apis';

const Place = () => {
  const [place, setPlace] = useState({});

  const auth = useContext(AuthContext);
  const params = useParams();
  const history = useHistory();

  const onBack = () => history.push('/places');

  const onFetchPlace = async () => {
    const res = await fetchPlace(params.id, auth.token);
    if (res) {
      setPlace(res);
    }
  };

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col lg={12}>
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <Button variant="link" onClick={onBack}>
                <IoMdArrowBack size={25} color="black" />
              </Button>
              <h3 className="mb-0 ml-2 mr-2">{place.name}</h3>
            </div>
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Place;
