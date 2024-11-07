import React, { useState, useEffect } from "react";
import { GET, TOKEN_KEY } from "../services/fetcher";
import { Navigate } from "react-router-dom";

interface AuthWrapperProps {
    children: React.ReactNode;
}

const AuthWrapper = (props: AuthWrapperProps) => {
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);

    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    useEffect(() => {
        GET("/auth/token_check")
            .then(() => setTokenIsValid(true))
            .finally(() => setHasChecked(true));
    }, []);

    if (!hasChecked) {
        return <></>;
    }

    if (!tokenIsValid) {
        return <Navigate to={"/login"} />;
    }

    return <>{props.children}</>;
};

export default AuthWrapper;
