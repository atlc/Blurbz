import React, { useState } from "react";
import { POST, TOKEN_KEY } from "../services/fetcher";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleLogin = () => {
        POST("/auth/login", { email, password }).then((data) => {
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
                    <h1 className="text-center">Logging In</h1>
                    <label>Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                    <label>Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                    <button onClick={handleLogin} className="btn btn-success">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
