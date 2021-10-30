/** @format */

import { useState, useEffect, useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { fetchOrders } from '../apis';
import AuthContext from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Order from '../components/Order';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const params = useParams();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onBack = () => history.push(`/places/${params.id}`);

  const onFetchOrders = async () => {
    const res = await fetchOrders(params.id, auth.token);

    if (res) {
      setOrders(res);
    }
  };

  useEffect(() => {
    onFetchOrders();
    const interval = setInterval(() => {
      onFetchOrders();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="d-flex align-item-center mb-4">
        <Button variant="link" onClick={onBack}>
          <IoMdArrowBack size={25} color="black" />
        </Button>

        <h3 className="mb-0 ml-2 mr-2">My Orders</h3>
      </div>

      <Row className="justify-content-center">
        {orders?.map((order) => (
          <Col key={order.id} lg={8}>
            <Order order={order} />
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
};

export default Orders;
