import React, { useEffect, useState } from "react";
import { GET } from "../services/fetcher";
import { Blurb } from "../types";
import { Link } from "react-router-dom";

const AllBlurbz = () => {
    const [blurbz, setBlurbz] = useState<Blurb[]>([]);

    useEffect(() => {
        GET("/api/blurbz").then((blurbData) => setBlurbz(blurbData));
    }, []);

    return (
        <div>
            <h1 className="text-center">All Blurbz</h1>
            <div className="container">
                <div className="row justify-content-center">
                    {blurbz.map((blurb) => (
                        <div className="col-12 col-md-9 col-lg-7" key={`blurb-card-${blurb.id}`}>
                            <div className="card shadow-lg my-2 p-3">
                                <div className="card-body">
                                    <em>{blurb.content}</em>
                                    <div className="card-footer">
                                        <Link to={`/blurbz/${blurb.id}`} className="btn btn-info">
                                            See my details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllBlurbz;
