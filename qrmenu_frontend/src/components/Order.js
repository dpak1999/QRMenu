/** @format */

import { Card } from 'react-bootstrap';

const Order = ({ order }) => {
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between">
        <span>{`Order ${order.id} - Table #${order.table}`}</span>
        <span>
          <strong>₹ {order.amount}</strong>
        </span>
      </Card.Header>
      <Card.Body>
        {JSON.parse(order.detail).map((item) => (
          <div className="mb-2">
            <span>x{item.quantity}</span>
            <img
              src={item.image}
              width={30}
              height={30}
              alt={item.name}
              style={{ borderRadius: 3, margin: '0 10px' }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Order;
