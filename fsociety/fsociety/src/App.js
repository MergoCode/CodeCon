// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Resources from './views/Resources';
import Profile from './views/Profile';
import AdminRequests from './views/AdminRequests';
import RequestDetails from './views/RequestDetails';
import Signup from './views/Signup';
import Login from './views/Login';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';
import RequestCreate from './views/RequestCreate'; // Зміна шляху до компонента RequestCreate

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin/requests" element={<AdminRequests />} />
                    <Route path="/requests/:requestId" element={<RequestDetails />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<PrivateRoute children={<Profile />} />} />
                    <Route path="/requestcreate" element={<RequestCreate />} /> {/* Додавання маршруту для RequestCreate */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
