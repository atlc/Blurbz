import React, { useState } from "react";
import { POST } from "../services/fetcher";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [content, setContent] = useState("");
    const nav = useNavigate();

    const handleBlurb = () => {
        POST("/api/blurbz", { content }).then((data) => {
            if (data.id) {
                nav(`/blurbz/${data.id}`);
            }
        });
    };

    return (
        <div className="mt-5">
            <h1 className="text-center">Create a blurb!</h1>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <label>Blurb:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                    <button className="btn btn-success" onClick={handleBlurb}>
                        Blurb It!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Create;
