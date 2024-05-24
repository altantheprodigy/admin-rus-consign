// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProdukPage from "../Page/ProdukPage/ProdukPage.jsx";
import MitraPage from "../Page/MitraPage/MitraPage.jsx";
import TransactionHistory from "../Page/TransactionHistoryPage/TransactionHistory.jsx";
import UserPage from "../Page/UserPage/UserPage.jsx";

function Routing() {
    return (
        <Router>
                <Routes>
                    <Route path="/produk" element={<ProdukPage/>} />
                    <Route path="/user" element={<UserPage/>} />
                    <Route path="/mitra" element={<MitraPage/>} />
                    <Route path="/" element={<TransactionHistory/>} />
                </Routes>
        </Router>
    );
}

export default Routing;
