import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';


const AddSound = () => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    audio_url: '',
    thumbnail_url: '',
    category_id: ''
});
const [audioFile, setAudioFile] = useState(null);
const [thumbnailFile, setThumbnailFile] = useState(null);
const [categories, setCategories] = useState([]);

useEffect(() => {
  // Fetch categories from the backend
  axios.get('http://127.0.0.1:8000/categories/')
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the categories!', error);
    });
}, []);



const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

// Handle Video File
const handleFileAudioChange = (e) => {

    setAudioFile(e.target.files[0]);

};

// Handle Thumbnail Image File
const handleFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    let audioUrl = "";
    let thumbnailUrl = "";

    if (audioFile) {
        const storageRef1 = ref(storage, `sound/audio/${audioFile.name}`);
        await uploadBytes(storageRef1, audioFile);
        audioUrl = await getDownloadURL(storageRef1);
    }

    if (thumbnailFile) {
        const storageRef2 = ref(storage, `sound/thumbnail/${thumbnailFile.name}`);
        await uploadBytes(storageRef2, thumbnailFile);
        thumbnailUrl = await getDownloadURL(storageRef2);
    }


    const soundData = {
        ...formData,
        audio_url: audioUrl || formData.audio_url,
        thumbnail_url: thumbnailUrl || formData.thumbnail_url
    };

    axios.post('http://127.0.0.1:8000/sounds/', soundData) // fastapi call
        .then(response => {
            console.log(response.data);
            alert('Sound added successfully!');
        })
        .catch(error => {
            console.error('There was an error adding the meditation!', error);
        });
};
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Add New Sound" isOption>
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
                                <label htmlFor="duration" className="form-label">Duration (seconds)</label>
                                <input
                                    type = "number"
                                    className="form-control"
                                    id="duration"
                                    name="duration"
                                    rows="3"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                <label htmlFor="category_id" className="form-label">Sound Category</label>
                <select
                  className="form-control"
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>

                            <div className="mb-3">
                                <label htmlFor="audio_url" className="form-label">Upload Audio File</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="audio_url"
                                    accept="audio/*"
                                    onChange={handleFileAudioChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="thumbnail_url" className="form-label">Upload Thumbnail Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="thumbnail_url"
                                    accept="image/*"
                                    onChange={handleFileChange}
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

export default AddSound;
