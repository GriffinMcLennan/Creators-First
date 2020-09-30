import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { auth } from "./../firebase";
import { useDispatch } from "react-redux";
import db from "./../firebase";
import capitalize from "./../functions/capitalize";

function RegisterPage() {
    const history = useHistory();
    const state = useSelector((state) => state);
    const isSignedIn = state.user.username !== null;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSignedIn) {
            history.push("/");
        }
    }, [state, history, isSignedIn]);

    const handleRegistration = (e) => {
        e.preventDefault();
        setLoading(true);

        const realUsername = capitalize(username.trim().toLowerCase());

        auth.createUserWithEmailAndPassword(realUsername, password)
            .then(async (result) => {
                await handleNewUser(result);
                handleSignin(result);
                setLoading(false);
                history.push("/");
            })
            .catch((error) => {
                alert(error.message);
                setLoading(false);
            });
    };

    const handleSignin = (result) => {
        let data = result.user;

        dispatch({
            type: "SET_USER",
            payload: {
                data,
            },
        });

        getSubscriptions(data.uid);
    };

    const getSubscriptions = async (uid) => {
        await db
            .collection("uidToUser")
            .doc(uid)
            .get()
            .then((result) => {
                let subscriptions = result.data().subscriptions;
                dispatch({
                    type: "SET_SUBSCRIPTIONS",
                    payload: {
                        subscriptions,
                    },
                });
            });
    };

    const handleNewUser = async (result) => {
        if (result.additionalUserInfo.isNewUser) {
            await db.collection("uidToUser").doc(result.user.uid).set({
                subscriptions: [],
            });
        }
    };

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

                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleRegistration(e)}
                    style={ButtonStyle}
                    disabled={loading}
                >
                    Sign-Up
                </Button>
            </div>
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

const ButtonStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
};

export default RegisterPage;
