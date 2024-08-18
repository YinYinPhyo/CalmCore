import React, {useEffect, useState} from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BootstrapTableSound = () => {
  const [sounds, setSounds] = useState([]);
 
  useEffect(() => {
    
      fetch("http://127.0.0.1:8000/sounds/")
      .then(response => response.json())
      .then(data => setSounds(data))
      .catch(error => console.error('Error fetching sounds:', error));
}, []);
const handleDelete = (soundId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this sound?");
  if (confirmDelete) {
    fetch(`http://127.0.0.1:8000/sounds/${soundId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setSounds(sounds.filter(sound => sound.id !== soundId));
        } else {
          console.error('Failed to delete sound:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting sound:', error));
  }
};
  return (
    <React.Fragment>
      <div>
                {/* <Button variant="primary">Add New Sound</Button> */}
                <Link to={`/add-sounds`} >
                <Button
                          variant="primary">
                          Add New Sound
                        </Button>
                </Link>
        </div>
      <Row>
        <Col>
          
          <Card>
            <Card.Header>
              <Card.Title as="h5">Sound List</Card.Title>
              <span className="d-block m-t-5">
              Mindfulness sound audios including sleep sounds, nature, ambient and instrument sounds for our mind and body relaxation.
              </span>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Duration (sec)</th>
                    <th>Category Name</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {sounds.map((sound, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                      {/* <th scope="row">{sound.id}</th> */}
                      <td>{sound.title}</td>
                      <td>{sound.duration}</td>
                     
                      <td><i className="fa fa-circle text-c-green f-10 m-r-15" />{sound.category.category_name}</td>
                   
                      <td>
                        
                      <Link to={`/sounds/${sound.id}`} >
                      <Button 
                          variant="info"
                          size="sm"
                          >VIEW</Button>
                      </Link>
                      <Link to={`/edit-sound/${sound.id}`} >
                      <Button
                          variant="primary"
                          size="sm">
                          EDIT
                          </Button>
                      </Link>
                      {/* <Link to={`/sounds/${sound.id}`} >
                          DELETE
                      </Link> */}
                      <Button
                          variant="danger"
                          size="sm"
                         
                          onClick={() => handleDelete(sound.id)}>
                          DELETE
                        </Button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BootstrapTableSound;
