import React, { useState } from "react";
import { POST, TOKEN_KEY } from "../services/fetcher";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleRegistration = () => {
        POST("/auth/register", { email, password }).then((data) => {
            if (data.token) {
                localStorage.setItem(TOKEN_KEY, data.token);
                nav("/create");
            }
        });
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-8">
                <div className="card shadow-lg p-3 mt-5">
                    <h1 className="text-center">Registering</h1>
                    <label>Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                    <label>Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                    <button onClick={handleRegistration} className="btn btn-success">
                        Finish Registration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
