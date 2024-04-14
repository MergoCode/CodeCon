import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RequestDetails.css';

const RequestDetails = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [requestData, setRequestData] = useState(null);
    const [requestsList, setRequestsList] = useState([]);

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const response = await axios.get('/request-details-data/1');
                setRequestData(response.data);
            } catch (error) {
                console.error('Error fetching request data:', error);
            }
        };

        fetchRequestData();
    }, []);

    useEffect(() => {
        const fetchRequestsList = async () => {
            try {
                const response = await axios.get('/request-list');
                setRequestsList(response.data);
            } catch (error) {
                console.error('Error fetching requests list:', error);
            }
        };

        fetchRequestsList();
    }, []);

    const handleToggle = (id) => {
        setExpandedId(expandedId === id ? null : id); // Розширення лише для вибраного елементу, згортання, якщо вже розширено
    };

    return (
        <div>
            {requestsList.map((request, index) => (
                <div key={index} className="request-details-container">
                    <h1 className="request-details-header" id="title">{request.title}</h1>
                    <div className="request-details-content">
                        <p>Type: {request.category}</p>
                        {expandedId === index && (
                            <>
                                <p>Description: {request.description}</p>
                                <p>Name: {request.authorname}</p>
                            </>
                        )}
                    </div>
                    <button className="expand-button" onClick={() => handleToggle(index)}>
                        {expandedId === index ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RequestDetails;
