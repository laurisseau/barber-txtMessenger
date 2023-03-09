import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CreateNumber() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const createContact = await axios.post('/createContact', {
        name,
        number,
      });

      if (createContact) window.location = '/';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-5">
      <Link to="/">Back</Link>
      <Form onSubmit={submitHandler} className="margin-top">
        <Row className="justify-content-md-center ">
          <Col md="7">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="number">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="w-100 mt-3">
              Create Contact
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
