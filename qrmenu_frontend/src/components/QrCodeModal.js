/** @format */

import { Col, Container, Modal, Row } from 'react-bootstrap';
import QRCodeReact from 'qrcode.react';

const QrCodeModal = ({ show, onHide, place }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body className="text-center pt-4">
        <Container>
          <h3>QR Code for tables</h3>
          <div className="mt-4 mb-4">
            <h5 className="mb-0 mr-2">
              Total tables : <strong>{place.number_of_tables}</strong>
            </h5>
          </div>

          <Row>
            {Array.from(
              { length: place.number_of_tables },
              (_, i) => i + 1
            ).map((table) => (
              <Col key={table} lg={4} md={6} className="mb-4">
                <QRCodeReact
                  value={`${window.location.origin}/menu/${place.id}/${table}`}
                  size={200}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default QrCodeModal;
