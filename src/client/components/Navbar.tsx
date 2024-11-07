import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GET, TOKEN_KEY } from "../services/fetcher";

const PUBLIC_PAGES = ["/login", "/register", "/", "/blurbz"];

const Navbar = () => {
    const nav = useNavigate();
    const loc = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        nav("/login");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        if (PUBLIC_PAGES.includes(loc.pathname)) return;

        GET("/auth/token_check")
            .then(() => setIsLoggedIn(true))
            .catch(() => setIsLoggedIn(false));
    }, [loc.pathname]);

    return (
        <div className="bg-info">
            <Link to={"/"} className="btn btn-primary m-2">
                Home
            </Link>
            <Link to={"/blurbz"} className="btn btn-primary m-2">
                See All Blurbz
            </Link>
            {isLoggedIn && (
                <Link to={"/create"} className="btn btn-primary m-2">
                    Create A Blurb
                </Link>
            )}
            {!isLoggedIn && (
                <Link to={"/login"} className="btn btn-primary m-2">
                    Login
                </Link>
            )}
            {!isLoggedIn && (
                <Link to={"/register"} className="btn btn-primary m-2">
                    Register
                </Link>
            )}
            {isLoggedIn && (
                <button onClick={handleLogout} className="btn btn-primary m-2">
                    Logout
                </button>
            )}
        </div>
    );
};

export default Navbar;
