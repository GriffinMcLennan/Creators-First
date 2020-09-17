import React, { useState } from "react";
import "./Home.css";
import creatorImage1 from "./homepage_images/homepage_creator1.jpg";
import TextField from "@material-ui/core/TextField";
import { auth, provider } from "./../firebase";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const googleLogin = (e) => {
        e.preventDefault();

        auth.signInWithPopup(provider)
            .then((result) =>
                dispatch({
                    type: "SET_USER",
                    payload: {
                        result,
                    },
                })
            )
            .catch((error) => error.message);
    };

    const normalLogin = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(username, password)
            .then((res) => console.log(res))
            .catch((error) => console.log(error.message));
    };

    const normalRegister = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(username, password)
            .then((res) => console.log(res))
            .catch((error) => console.log(error.message));
    };

    return (
        <div className="home">
            {state.user.username === null ? (
                <div className="home__welcome">
                    <h1>Welcome to Creators First!</h1>
                    <h3>
                        The premier platform for connecting your audience with
                        exclusive content.
                    </h3>

                    <div className="home__body">
                        <img src={creatorImage1} />

                        <form
                            className="home__input"
                            onSubmit={(e) => normalLogin(e)}
                        >
                            <div className="home__googleLogin">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => googleLogin(e)}
                                >
                                    Sign-in with Google
                                </Button>
                            </div>
                            <h2>Login or Signup!</h2>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="home__login">
                                <div className="home__loginNormal">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => normalLogin(e)}
                                    >
                                        Login
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => normalRegister(e)}
                                    >
                                        Sign-up
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <h3>
                        At Creators First you receive 10% more money than from
                        the next leading competitor!
                    </h3>
                </div>
            ) : (
                <h1>You are signed in!</h1>
            )}
        </div>
    );
}

export default Home;
