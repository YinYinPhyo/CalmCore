import React, {useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';
import axios from 'axios';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    category_name: ''
    
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    // send the data to the backend
    axios.post('http://127.0.0.1:8000/categories/', formData)
        .then(response => {
            console.log(response.data);
            alert('Sound Category added successfully!');
        })
        .catch(error => {
            console.error('There was an error adding the video!', error);
        });
};

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Add New Sound Category" isOption>
          
         <form onSubmit={handleSubmit}>
         <div className="mb-3">
                    <label htmlFor="category_name" className="form-label">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category_name"
                        name="category_name"
                        value={formData.category_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
         </form>
          
          
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );


};

export default AddCategory;
