import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';

import sound_category_default from '../../../assets/images/sound/sound_category_default.webp';


const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  
  

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/categories/${id}`)
      .then(response => response.json())
      .then(data => setCategory(data))
      .catch(error => console.error('Error fetching sound category:', error));
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title= "Sound Category" isOption>
          <div className="row align-items-center justify-content-center">
            <p>
            Sound Category Name: 
              <h4>&quot;{category.category_name}&quot;</h4>
              
            </p>
            <p>
          <img width={600} height={500} src= {sound_category_default} alt="placeholder" />
          </p>
          </div>
          
          
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );


};

export default CategoryDetail;
