import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';


const SoundDetail = () => {
  const { id } = useParams();
  const [sound, setSound] = useState(null);

  
  

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/sounds/${id}`)
      .then(response => response.json())
      .then(data => setSound(data))
      .catch(error => console.error('Error fetching sound:', error));
  }, [id]);

  if (!sound) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title={sound.title} isOption>
          <div className="row align-items-center justify-content-center">
            <p>
              Duration: <b>{sound.duration} seconds</b>
              
            </p>
            <p>
              Sound Category: <b>{sound.category.category_name}</b>
              
            </p>
            <div>
          <img width={250} height={250} src= {sound.thumbnail_url} alt="placeholder" />
          </div>
          </div>
          <div className="mb-3">
          {sound.audio_url && (
              // <ReactPlayer url={sound.audio_url} width="720px" controls />
              <ReactPlayer url={sound.audio_url} width="720px" controls />
            )}
            
            </div>
          
         
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );


};

export default SoundDetail;
