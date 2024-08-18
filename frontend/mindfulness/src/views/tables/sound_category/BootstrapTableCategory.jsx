import React, {useEffect, useState} from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BootstrapTableCategory = () => {
  const [categories, setCategories] = useState([]);
 
  useEffect(() => {
    
      fetch("http://127.0.0.1:8000/categories/")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching sound categories:', error));
}, []);
const handleDelete = (categoryId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this sound category?");
  if (confirmDelete) {
    fetch(`http://127.0.0.1:8000/categories/${categoryId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setCategories(categories.filter(category => category.id !== categoryId));
        } else {
          console.error('Failed to delete sound category:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting sound category:', error));
  }
};
  return (
    <React.Fragment>
      <div>
               
                <Link to={`/add-categories`} >
                <Button
                          variant="primary"
                          >
                          Add New Sound Category
                        </Button>
                </Link>
        </div>
      <Row>
        <Col>
          
          <Card>
            <Card.Header>
              <Card.Title as="h5">Sound Category List</Card.Title>
              <span className="d-block m-t-5">
                Category list for sound audios including sleep sounds, nature, ambient and instrument sounds, etc. 
              </span>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Category Name</th>
                    <th>Operations</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category,index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                     
                      <td><i className="fa fa-circle text-c-green f-10 m-r-15" />{category.category_name}</td>
                    
                      <td>
                        
                      <Link to={`/categories/${category.id}`} >
                      <Button 
                          variant="info"
                          size="sm"
                          >VIEW</Button>
                      </Link>
                      <Link to={`/edit-category/${category.id}`} >
                      <Button
                          variant="primary"
                          size="sm">
                          EDIT
                          </Button>
                      </Link>
                      <Button
                          variant="danger"
                          size="sm"
                         
                          onClick={() => handleDelete(category.id)}>
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

export default BootstrapTableCategory;
