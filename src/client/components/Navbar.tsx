import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-info">
            <Link to={"/"} className="btn btn-info m-2">
                Home
            </Link>
            <Link to={"/blurbz"} className="btn btn-info m-2">
                See All Blurbz
            </Link>
            <Link to={"/create"} className="btn btn-info m-2">
                Create A Blurb
            </Link>
            <Link to={"/login"} className="btn btn-info m-2">
                Login
            </Link>
            <Link to={"/register"} className="btn btn-info m-2">
                Register
            </Link>
        </div>
    );
};

export default Navbar;
