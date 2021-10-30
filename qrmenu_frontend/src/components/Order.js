/** @format */

import { Button, Card } from 'react-bootstrap';

const Order = ({ order, onComplete }) => {
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between">
        <span>{`Order ${order.id} - Table #${order.table}`}</span>
        <span>
          <strong>₹ {order.amount}</strong>
        </span>
      </Card.Header>
      <Card.Body className="d-flex justify-content-between">
        <div>
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
        </div>
        <div>
          {onComplete ? (
            <Button variant="standard" size="md" onClick={onComplete}>
              Done
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Order;
