import React, { useEffect, useState } from "react";
import { DELETE, GET, PUT } from "../services/fetcher";
import { useNavigate, useParams } from "react-router-dom";

const EditBlurb = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [content, setContent] = useState("");

    useEffect(() => {
        GET(`/api/blurbz/${id}`).then((blurbData) => setContent(blurbData.content));
    }, [id]);

    const handleUpdateBlurb = () => {
        PUT(`/api/blurbz/${id}`, { content }).then(() => nav(`/blurbz/${id}`));
    };

    const handleDeleteBlurb = () => {
        DELETE(`/api/blurbz/${id}`).then(() => nav(`/blurbz`));
    };

    return (
        <div className="mt-5">
            <h1 className="text-center bg-warning">Edit this blurb!</h1>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <label>Blurb:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                    <button className="btn btn-warning" onClick={handleUpdateBlurb}>
                        Save Edit!
                    </button>
                    <button className="btn btn-danger" onClick={handleDeleteBlurb}>
                        DELETE BLURB
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBlurb;
