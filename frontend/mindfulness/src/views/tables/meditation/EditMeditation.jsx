import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';
import ReactPlayer from 'react-player';

const EditMeditation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  useEffect(() => {
    // Fetch the meditation details from the backend
    axios.get(`http://localhost:8000/meditations/${id}/`)
      .then(response => {
        setFormData({
          title: response.data.title,
          description: response.data.description,
          video_url: response.data.video_url,
          thumbnail_url: response.data.thumbnail_url
        });
      })
      .catch(error => {
        console.error('There was an error fetching the meditation details!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle Video File
  const handleFileVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
    setFormData({
      ...formData,
      video_url: URL.createObjectURL(e.target.files[0])
    });
  };

  // Handle Thumbnail Image File
  const handleFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
    setFormData({
      ...formData,
      thumbnail_url: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let videoUrl = formData.video_url;
    let thumbnailUrl = formData.thumbnail_url;

    if (videoFile) {
      const storageRef1 = ref(storage, `meditation/video/${videoFile.name}`);
      await uploadBytes(storageRef1, videoFile);
      videoUrl = await getDownloadURL(storageRef1);
    }

    if (thumbnailFile) {
      const storageRef2 = ref(storage, `meditation/thumbnail/${thumbnailFile.name}`);
      await uploadBytes(storageRef2, thumbnailFile);
      thumbnailUrl = await getDownloadURL(storageRef2);
    }

    const meditationData = {
      ...formData,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl
    };

    axios.put(`http://localhost:8000/meditations/${id}/`, meditationData) // FastAPI PUT method call
      .then(response => {
        console.log(response.data);
        alert('Meditation updated successfully!');
        navigate('/tables/meditations'); // Redirect to the meditations list page
      })
      .catch(error => {
        console.error('There was an error updating the meditation!', error);
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card title="Edit Meditation" isOption>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="thumbnail_url" className="form-label">Upload Thumbnail</label>
                <input
                  type="file"
                  className="form-control"
                  id="thumbnail_url"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="mb-3">
                <p>
                  <img width={250} height={250} src={formData.thumbnail_url} alt="placeholder" />
                </p>
              </div>

              <div className="mb-3">
                <label htmlFor="video_url" className="form-label">Upload Video File</label>
                <input
                  type="file"
                  className="form-control"
                  id="video_url"
                  accept="video/*"
                  onChange={handleFileVideoChange}
                />
              </div>
              <div className="mb-3">
                {formData.video_url && (
                  <ReactPlayer url={formData.video_url} width="720px" controls />
                )}
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EditMeditation;
