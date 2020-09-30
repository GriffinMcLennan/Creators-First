import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function RegisterPage() {
    const history = useHistory();
    const state = useSelector((state) => state);
    const isSignedIn = state.user.username !== null;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isSignedIn) {
            history.push("/");
        }
    }, [state]);

    return (
        <div className="registerpage">
            <h2>Sign-up for a Creators First Account</h2>

            <div className="registerpage__input">
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    style={TextFieldStyle}
                />

                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={TextFieldStyle}
                />
            </div>

            <Button variant="contained" color="primary">
                Sign-Up
            </Button>
        </div>
    );
}

const TextFieldStyle = {
    width: "30vw",
    minWidth: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
};

export default RegisterPage;
