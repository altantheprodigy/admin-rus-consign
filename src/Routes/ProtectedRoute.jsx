import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem('authToken');

    // If there is no token, redirect to the login page
    if (!authToken) {
        return <Navigate to="/" />;
    }

    // If there is a token, allow access to the page
    return children;
};

export default ProtectedRoute;
