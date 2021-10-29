/** @format */

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchPlace } from '../apis';
import MenuList from '../components/MenuList';

const OrderButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  width: 60px;
  height: 60px;
`;

const Menu = () => {
  const [place, setPlace] = useState({});
  const [shoppingCart, setShoppingCart] = useState({});
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const params = useParams();

  const onFetchPlace = async () => {
    const res = await fetchPlace(params.id);
    if (res) {
      setPlace(res);
    }
  };

  const onAddItemToShoppingCart = (item) => {
    setShoppingCart({
      ...shoppingCart,
      [item.id]: {
        ...item,
        quantity: (shoppingCart[item.id]?.quantity || 0) + 1,
      },
    });
  };

  const totalQuantity = useMemo(
    () =>
      Object.keys(shoppingCart)
        .map((i) => shoppingCart[i].quantity)
        .reduce((a, b) => a + b, 0),
    [shoppingCart]
  );

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <MenuList
            place={place}
            shoppingCart={shoppingCart}
            onOrder={onAddItemToShoppingCart}
          />
        </Col>
      </Row>

      {totalQuantity ? (
        <OrderButton
          variant="standard"
          onClick={() => setShowShoppingCart(!showShoppingCart)}
        >
          {showShoppingCart ? <IoCloseOutline size={25} /> : totalQuantity}
        </OrderButton>
      ) : null}
    </Container>
  );
};

export default Menu;
