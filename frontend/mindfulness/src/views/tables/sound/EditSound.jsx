import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

const EditSound = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

        // Fetch the sound details from the backend
        axios.get(`http://127.0.0.1:8000/sounds/${id}/`)
            .then(response => {
                setFormData({
                    title: response.data.title,
                    duration: response.data.duration,
                    audio_url: response.data.audio_url,
                    thumbnail_url: response.data.thumbnail_url,
                    category_id: response.data.category_id
                });
            })
            .catch(error => {
                console.error('There was an error fetching the sound details!', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileAudioChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    const handleFileChange = (e) => {
        setThumbnailFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let audioUrl = formData.audio_url;
        let thumbnailUrl = formData.thumbnail_url;

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
            audio_url: audioUrl,
            thumbnail_url: thumbnailUrl
        };

        axios.put(`http://127.0.0.1:8000/sounds/${id}/`, soundData)
            .then(response => {
                console.log(response.data);
                alert('Sound updated successfully!');
                navigate('/tables/sounds'); // Redirect to the sounds list page
            })
            .catch(error => {
                console.error('There was an error updating the sound!', error);
            });
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card title="Edit Sound" isOption>
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
                                    type="number"
                                    className="form-control"
                                    id="duration"
                                    name="duration"
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
                                <label htmlFor="thumbnail_url" className="form-label">Upload Thumbnail Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="thumbnail_url"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mb-3">
                                <img width={250} height={250} src={formData.thumbnail_url} alt="placeholder" />
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
                                <div className="mb-3">
                                    {formData.audio_url && (
                                        <ReactPlayer url={formData.audio_url} width="720px" controls />
                                    )}

                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditSound;
