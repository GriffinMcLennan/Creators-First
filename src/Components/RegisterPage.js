import React, { useEffect } from "react";
import "./RegisterPage.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function RegisterPage() {
    const history = useHistory();
    const state = useSelector((state) => state);
    const isSignedIn = state.user.username !== null;

    useEffect(() => {
        if (isSignedIn) {
            history.push("/");
        }
    }, [state]);

    return (
        <div className="registerpage">
            <h1>Register</h1>
        </div>
    );
}

export default RegisterPage;
