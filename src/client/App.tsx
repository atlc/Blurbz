import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./views/Create";
import Home from "./views/Home";
import AllBlurbz from "./views/AllBlurbz";
import BlurbDetails from "./views/BlurbDetails";
import EditBlurb from "./views/EditBlurb";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/blurbz" element={<AllBlurbz />} />
                <Route path="/blurbz/:id" element={<BlurbDetails />} />
                <Route path="/blurbz/:id/edit" element={<EditBlurb />} />
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="/register" element={<h1>Register</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
