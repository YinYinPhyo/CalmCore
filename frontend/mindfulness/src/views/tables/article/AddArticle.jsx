import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';

const AddArticle = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        content: '',
        thumbnail_url: '',
        published_date: new Date()
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    // Handle for Thumbnail
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            published_date: date
        });
    };

    // After Clicking "Submit" button
    const handleSubmit = async (e) => {
        e.preventDefault();

        let thumbnailUrl = '';
        if (file) {
            const storageRef = ref(storage, `articles/${file.name}`);
            await uploadBytes(storageRef, file);
            thumbnailUrl = await getDownloadURL(storageRef);    //get url from uploaded thumbnail image of Storage
        }

        const articleData = {
            ...formData,
            thumbnail_url: thumbnailUrl || formData.thumbnail_url
        };

        axios.post('http://localhost:8000/articles/', articleData) //fast api post method call
            .then(response => {
                console.log(response.data);
                alert('Article added successfully!');
            })
            .catch(error => {
                console.error('There was an error adding the article!', error);
            });
    };
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card title="Add New Article" isOption>
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
                                <label htmlFor="author" className="form-label">Author</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content</label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    name="content"
                                    rows="3"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="thumbnail_file" className="form-label">Upload Thumbnail</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="thumbnail_file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="published_date" className="form-label">Published Date</label>
                                <DatePicker
                                    selected={formData.published_date}
                                    onChange={handleDateChange}
                                    className="form-control"
                                    id="published_date"
                                    name="published_date"
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

export default AddArticle;
