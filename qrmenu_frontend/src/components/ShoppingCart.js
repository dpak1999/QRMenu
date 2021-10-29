/** @format */

import { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import OperationButton from './OperationButton';

const ShoppingCart = ({ items, onAdd, onRemove }) => {
  const totalPrice = useMemo(
    () => items.map((i) => i.quantity * i.price).reduce((a, b) => a + b, 0),
    [items]
  );

  return (
    <>
      <h3 className="text-center mb-4">
        <strong>Your order</strong>
      </h3>
      <Card>
        <Card.Body>
          {items.map((item) => (
            <div key={item.id} className="d-flex mb-4 align-items-center">
              <div className="flex-grow-1">
                <p className="mb-0">
                  <strong>{item.name}</strong>
                </p>
                <span>₹ {item.price}</span>
              </div>

              <div className="d-flex mb-4 align-items-center">
                <OperationButton
                  variant="lightgray"
                  size="sm"
                  onClick={() => onRemove(item)}
                >
                  -
                </OperationButton>
                <span>{item.quantity}</span>
                <OperationButton
                  variant="lightgray"
                  size="sm"
                  onClick={() => onAdd(item)}
                >
                  +
                </OperationButton>
              </div>
            </div>
          ))}

          <hr />

          <div className="d-flex justify-content-between">
            <h5>
              <strong>Total</strong>
            </h5>
            <h5>
              <strong>₹ {totalPrice}</strong>
            </h5>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ShoppingCart;
