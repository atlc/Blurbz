import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./views/Create";
import Home from "./views/Home";
import AllBlurbz from "./views/AllBlurbz";
import BlurbDetails from "./views/BlurbDetails";
import EditBlurb from "./views/EditBlurb";
import Navbar from "./components/Navbar";
import Register from "./views/Register";
import Login from "./views/Login";
import AuthWrapper from "./components/AuthWrapper";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/create"
                    element={
                        <AuthWrapper>
                            <Create />
                        </AuthWrapper>
                    }
                />
                <Route path="/blurbz" element={<AllBlurbz />} />
                <Route path="/blurbz/:id" element={<BlurbDetails />} />
                <Route
                    path="/blurbz/:id/edit"
                    element={
                        <AuthWrapper>
                            <EditBlurb />
                        </AuthWrapper>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
