import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import './App.css';

function App() {

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([
    { id: 1, value: "banana", isChecked: false },
    { id: 2, value: "apple", isChecked: false },
    { id: 3, value: "mango", isChecked: false },
    { id: 4, value: "grap", isChecked: false }
  ]);

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    
    setIsCheck(list.map(li => `${li.id}`));
    
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  console.log(isCheckAll)
  const handleClick = e => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);

    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

console.log(isCheck)


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="7">
          <div className="d-flex justify-content-between mb-3 mt-3">
            <button className="ps-5 pe-5 button">+</button>
            <div>
            <input
        type="checkbox"
        name="selectAll"
        id="selectAll"
        onChange={handleSelectAll}
        checked={isCheckAll}
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
              {list.map((items, id)=>(
              <tr key={id}>
                <th>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={items.id}
                    onChange={handleClick}
                  />
                </th>
                <td>{items.value}</td>
                <td>123</td>
                <td>del</td>
              </tr>
              ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

//className="border rounded"
