/** @format */

import { useEffect, useContext, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import AuthContext from '../context/AuthContext';
import { fetchPlace } from '../apis';
import MenuItemForm from '../components/MenuItemForm';
import MenuItem from '../components/MenuItem';

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0, 0.05);
`;

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

        <Col md={4}>
          <Panel>
            <MenuItemForm place={place} onDone={onFetchPlace} />
          </Panel>
        </Col>

        <Col md={8}>
          {place?.categories?.map((category) => (
            <div key={category.id} className="mb-5">
              <h4 className="mr-2 mb-4 mb-0">
                <strong>{category.name}</strong>
              </h4>
              {category.menu_items.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          ))}
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Place;
