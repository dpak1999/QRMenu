/** @format */

import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const auth = useContext(AuthContext);

  const onClick = () => {
    auth.register(username, password, () => history.replace('/places'));
  };

  useEffect(() => {
    if (auth.token) {
      history.replace('/places');
    }
  }, [history, auth.token]);

  return (
    <MainLayout>
      <Row className="justify-content-center">
        <Col lg={6} md={8}>
          <Card>
            <Card.Body>
              <h3 className="text-center">
                <strong>REGISTER</strong>
              </h3>

              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="standard"
                block
                onClick={onClick}
                disabled={auth.loading}
              >
                {auth.login ? (
                  <Spinner
                    variant="standard"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Register'
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Register;
