/** @format */

import { Col } from 'react-bootstrap';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 5px;
  background-color: white;
  margin-bottom: 30px;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  opacity: ${({ active }) => (active ? 1 : 0.6)};

  > div:first-child {
    width: 40%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-size: cover;
  }
  > div:last-child {
    padding: 15px 20px;
    min-height: 150px;
  }
`;

const MenuItem = ({ item }) => {
  return (
    <Container active={item.is_available}>
      <Col xs={5} style={{ backgroundImage: `url(${item.image})` }} />
      <Col xs={7} className="d-flex flex-column w-100 justify-content-between">
        <div>
          <h4 className="mb-2">
            <strong>{item.name}</strong>
          </h4>
          <p className="mb-4">{item.description}</p>
        </div>
        <div className="d-flex align-items-end justify-content-between">
          <div>
            <h5 className="mb-0 text-standard">
              <strong>₹ {item.price}</strong>
            </h5>
          </div>
          {!item.is_available ? (
            <small className="text-secondary">Not Available</small>
          ) : (
            ''
          )}
        </div>
      </Col>
    </Container>
  );
};

export default MenuItem;
