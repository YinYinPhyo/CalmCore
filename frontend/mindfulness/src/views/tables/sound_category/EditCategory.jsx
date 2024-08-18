import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category_name: ''
  });

  useEffect(() => {
    // Fetch the category details from the backend
    axios.get(`http://127.0.0.1:8000/categories/${id}/`)
      .then(response => {
        setFormData({
          category_name: response.data.category_name
        });
      })
      .catch(error => {
        console.error('There was an error fetching the category details!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the updated data to the backend
    axios.put(`http://127.0.0.1:8000/categories/${id}/`, formData)
      .then(response => {
        console.log(response.data);
        alert('Sound Category updated successfully!');
        navigate('/tables/categories'); // Redirect to the categories list page
      })
      .catch(error => {
        console.error('There was an error updating the category!', error);
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Edit Sound Category" isOption>
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

export default EditCategory;
