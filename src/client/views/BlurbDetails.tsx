import React, { useEffect, useState } from "react";
import { GET } from "../services/fetcher";
import { Blurb } from "../types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BlurbDetails = () => {
    const [blurb, setBlurb] = useState<Blurb>();
    const { id } = useParams();

    useEffect(() => {
        GET(`/api/blurbz/${id}`).then((blurbData) => setBlurb(blurbData as Blurb));
    }, [id]);

    return (
        <div>
            <h1 className="text-center">All Blurbz</h1>
            <div className="container">
                <div className="row justify-content-center">
                    {blurb && (
                        <div className="col-12 col-md-9 col-lg-7" key={`blurb-card-${blurb.id}`}>
                            <div className="card shadow-lg my-2 p-3">
                                <div className="card-title">@User #{blurb.user_id}</div>
                                <div className="card-body">
                                    <em>{blurb.content}</em>
                                    <div className="card-footer">
                                        <p>
                                            {blurb.edited_at
                                                ? `Last edited at ${new Date(blurb.edited_at).toLocaleString()}`
                                                : `Created at ${new Date(blurb.created_at).toLocaleString()}`}
                                        </p>
                                        <Link to={`/blurbz/${id}/edit`} className="btn btn-warning">
                                            Edit me
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlurbDetails;
