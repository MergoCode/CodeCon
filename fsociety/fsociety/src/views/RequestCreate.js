import React, { useState } from 'react';
import axios from 'axios';
import './RequestCreate.css';

const RequestCreate = ({ onRequestCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/create-request', formData);
            console.log(response.data);
            setSuccessMessage('Request created successfully!');
            setFormData({
                title: '',
                category: '',
                description: ''
            });
            onRequestCreated(); // Оновлення списку запитів після створення нового
        } catch (error) {
            console.error('Error creating request:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while creating the request.');
            }
        }
    };

    return (
        <div className="create-request martop-2">
            <h2>Create Request</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input-title"
                    />
                </div>
                <div className="input-container">
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="select-category"
                    >
                        <option value="">Select Category</option>
                        <option value="Financial">Financial</option>
                        <option value="Material">Material</option>
                        <option value="Food">Food</option>
                    </select>
                </div>
                <div className="input-container">
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea-description"
                    ></textarea>
                </div>
                <div className="create-button">
                    <button type="submit" disabled={!formData.title || !formData.category || !formData.description}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestCreate;
