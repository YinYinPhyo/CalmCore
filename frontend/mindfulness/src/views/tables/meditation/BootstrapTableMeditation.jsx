import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BootstrapTableMeditation = () => {
  const [meditations, setMeditations] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/meditations/")
      .then(response => response.json())
      .then(data => setMeditations(data))
      .catch(error => console.error('Error fetching meditations:', error));
  }, []);
  const handleDelete = (meditationId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meditation?");
    if (confirmDelete) {
      fetch(`http://127.0.0.1:8000/meditations/${meditationId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setMeditations(meditations.filter(meditation => meditation.id !== meditationId));
          } else {
            console.error('Failed to delete meditation:', response.statusText);
          }
        })
        .catch(error => console.error('Error deleting meditation:', error));
    }
  };
  return (
    <React.Fragment>
      <div>
        <Link to={`/add-meditations`} >
          <Button
            variant="primary"
          >
            Add New Meditation
          </Button>
        </Link>
      </div>
      <Row>
        <Col>

          <Card>
            <Card.Header>
              <Card.Title as="h5">Meditation List</Card.Title>
              <span className="d-block m-t-5">
                Mindfulness meditation videos including guided meditations, chakra meditations, evening and morning meditations, etc.
              </span>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {meditations.map((meditation, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{meditation.title}</td>
                      <td><i className="fa fa-circle text-c-green f-10 m-r-15" /> {meditation.description}</td>
                      <td>
                        <Link to={`/meditations/${meditation.id}`} underline="hover" >
                          <Button
                            variant="info"
                            size="sm"
                          >VIEW</Button>
                        </Link>
                        <Link to={`/edit-meditation/${meditation.id}`} >
                          <Button
                            variant="primary"
                            size="sm">
                            EDIT
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"

                          onClick={() => handleDelete(meditation.id)}>
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

export default BootstrapTableMeditation;
