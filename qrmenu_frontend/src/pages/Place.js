/** @format */

import { useEffect, useContext, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineQrcode } from 'react-icons/ai';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import AuthContext from '../context/AuthContext';
import {
  fetchPlace,
  removeCategory,
  removeMenuItem,
  removePlace,
} from '../apis';
import MenuItemForm from '../components/MenuItemForm';
import MenuItem from '../components/MenuItem';
import QrCodeModal from '../components/QrCodeModal';

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0, 0.05);
`;

const Place = () => {
  const [place, setPlace] = useState({});
  const [show, setShow] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const auth = useContext(AuthContext);
  const params = useParams();
  const history = useHistory();

  const onBack = () => history.push('/places');

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const showQrModal = () => setShowQr(true);
  const hideQrModal = () => setShowQr(false);

  const onFetchPlace = async () => {
    const res = await fetchPlace(params.id, auth.token);
    if (res) {
      setPlace(res);
    }
  };

  const onRemovePlace = () => {
    const c = window.confirm('Are you sure?');

    if (c) {
      removePlace(params.id, auth.token).then(onBack);
    }
  };

  const onRemoveCategory = (id) => {
    const c = window.confirm('Are you sure?');

    if (c) {
      removeCategory(id, auth.token).then(onFetchPlace);
    }
  };

  const onRemoveMenuitem = (id) => {
    const c = window.confirm('Are you sure?');

    if (c) {
      removeMenuItem(id, auth.token).then(onFetchPlace);
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
            <div className="d-flex justify-content-between mb-4 align-items-center">
              <Button variant="link" onClick={onBack}>
                <IoMdArrowBack size={25} color="black" />
              </Button>
              <h3 className="mb-0 ml-2 mr-2">{place.name}</h3>
              <Button variant onClick={onRemovePlace}>
                <AiOutlineDelete size={25} color="red" />
              </Button>
            </div>

            <Button variant="link" onClick={showQrModal}>
              <AiOutlineQrcode size={25} />
            </Button>
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
              <div className="d-flex align-items-center mb-4">
                <h4 className="mr-2 mb-0">
                  <strong>{category.name}</strong>
                </h4>
                <Button variant onClick={() => onRemoveCategory(category.id)}>
                  <AiOutlineDelete size={25} color="red" />
                </Button>
              </div>
              {category.menu_items.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setSelectedItem(item);
                    showModal();
                  }}
                  onRemove={() => onRemoveMenuitem(item.id)}
                />
              ))}
            </div>
          ))}
        </Col>
      </Row>

      <Modal show={show} onHide={hideModal} centered>
        <Modal.Body>
          <h4 className="text-center">Menu Item</h4>
          <MenuItemForm
            place={place}
            onDone={() => {
              onFetchPlace();
              hideModal();
            }}
            item={selectedItem}
          />
        </Modal.Body>
      </Modal>

      <QrCodeModal show={showQr} onHide={hideQrModal} place={place} />
    </MainLayout>
  );
};

export default Place;
