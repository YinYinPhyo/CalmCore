import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';


const MeditationDetail = () => {
  const { id } = useParams();
  const [meditation, setMeditation] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/meditations/${id}`)
      .then(response => response.json())
      .then(data => setMeditation(data))
      .catch(error => console.error('Error fetching meditation:', error));
  }, [id]);

  if (!meditation) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title={meditation.title} isOption>
            <div className="row align-items-center justify-content-center">
              <p>
                <h5>&quot;{meditation.description}&quot;</h5>
              </p>
            </div>
            <p>
              <img width={250} height={250} src={meditation.thumbnail_url} alt="placeholder" />
            </p>
            {meditation.video_url && (
              <ReactPlayer url={meditation.video_url} width="720px" controls />
            )}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MeditationDetail;
