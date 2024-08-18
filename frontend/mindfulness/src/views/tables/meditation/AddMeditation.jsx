import React, {useState } from 'react';
import { Row, Col} from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';

const AddMeditation = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video_url: '',
        thumbnail_url: ''
    });
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);

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

    };

    // Handle Thumbnail Image File
    const handleFileChange = (e) => {
        setThumbnailFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let videoUrl = "";
        let thumbnailUrl = "";

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
            video_url: videoUrl || formData.video_url,
            thumbnail_url: thumbnailUrl || formData.thumbnail_url
        };

        axios.post('http://127.0.0.1:8000/meditations/', meditationData) // fastapi call
            .then(response => {
                console.log(response.data);
                alert('Meditation added successfully!');
                
            })
            .catch(error => {
                console.error('There was an error adding the meditation!', error);
            });
    };
    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card title="Add New Meditation" isOption>


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
                                <label htmlFor="thumbnail_url" className="form-label">Upload Thumbnail</label>
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

export default AddMeditation;
