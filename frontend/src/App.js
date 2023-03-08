import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import './App.css';

const test = [
  { id: 1, value: 'banana'},
  { id: 2, value: 'apple'},
  { id: 3, value: 'mango'},
  { id: 4, value: 'grap'},
];

function App() {
  //const [isCheckAll, setIsCheckAll] = useState(false);
  //const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(test);
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
        li.value === name ? { ...li, isChecked: checked } : li
      );
      setList(tempList);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="7">
          <div className="d-flex justify-content-between mb-3 mt-3">
            <button className="ps-5 pe-5 button">+</button>
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                name="allSelect"
                onChange={handleChange}
              />
              Select All
            </div>
          </div>
          <Table className="table border clients" responsive>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={false}
                    id="mastercheck"
                    onChange={() => console.log('hi')}
                  />
                </th>
                <th>Name</th>
                <th>NUMBER</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {list.map((items, id) => (
                <tr key={id}>
                  <th>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={items.value}
                      checked={items?.isChecked || false}
                      onChange={handleChange}
                    />
                  </th>
                  <td>{items.value}</td>
                  <td>123</td>
                  <td>del</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

