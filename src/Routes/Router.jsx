import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProdukPage from "../Page/ProdukPage/ProdukPage.jsx";
import MitraPage from "../Page/MitraPage/MitraPage.jsx";
import TransactionHistory from "../Page/TransactionHistoryPage/TransactionHistory.jsx";
import UserPage from "../Page/UserPage/UserPage.jsx";
import LoginPageAdmin from "../Page/Authentication/Login/LoginPageAdmin.jsx";
import RegisterAdminPage from "../Page/Authentication/Register/RegisterAdminPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";// Import the ProtectedRoute component

function Routing() {
    return (
        <Router>
            <Routes>
                {/* Protected routes */}
                <Route
                    path="/produk"
                    element={
                        <ProtectedRoute>
                            <ProdukPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <UserPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mitra"
                    element={
                        <ProtectedRoute>
                            <MitraPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/transaksi"
                    element={
                        <ProtectedRoute>
                            <TransactionHistory />
                        </ProtectedRoute>
                    }
                />

                {/* Public routes */}
                <Route path="/" element={<LoginPageAdmin />} />
                <Route path="/register" element={<RegisterAdminPage />} />
            </Routes>
        </Router>
    );
}

export default Routing;
