import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contacts = await axios.get('/getContacts');

        setList(contacts.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'allSelect') {
      let tempList = list.map((li) => {
        return { ...li, isChecked: checked };
      });
      setList(tempList);
    } else {
      let tempList = list.map((li) =>
        li.number === name ? { ...li, isChecked: checked } : li
      );
      setList(tempList);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const checkedArray = list.filter((el) => el.isChecked === true);

      const sentMessages = await axios.post('/create-msg', {
        checkedArray,
        message,
      });

      if (sentMessages) window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    try {
      const deleteContact = await axios.delete(`/deleteById/${id}`);

      if (deleteContact) window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Row className="justify-content-md-center ">
          <Col md="7">
            <div className="d-flex justify-content-between mb-3 mt-5 ">
              <Link to="/CreateNumber">
                <button type="button" className="ps-5 pe-5 ">
                  +
                </button>
              </Link>
              <div>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  name="allSelect"
                  onChange={handleChange}
                />
                <span>Select All</span>
              </div>
            </div>
            <div className="clients border mb-3">
              <Table className="table border" responsive>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="allSelect"
                        onChange={handleChange}
                      />
                    </th>
                    <th>NAME</th>
                    <th>NUMBER</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((items, id) => (
                    <tr key={id}>
                      <th>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={items.number}
                          checked={items?.isChecked || false}
                          onChange={handleChange}
                        />
                      </th>
                      <td>{items.name}</td>
                      <td>{items.number}</td>
                      <td>
                        <p
                          className="text-danger pointer"
                          onClick={(e) => {
                            deleteHandler(e, items._id);
                          }}
                        >
                          Delete
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <FloatingLabel controlId="floatingTextarea2" label="Message">
              <Form.Control
                as="textarea"
                placeholder="Leave a message here"
                style={{ height: '100px' }}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </FloatingLabel>
            <Button type="submit" className="w-100 mt-3">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
