import React, { useState } from "react";
import "./Home.css";
import creatorImage1 from "./homepage_images/homepage_creator1.jpg";
import TextField from "@material-ui/core/TextField";
import { auth, provider } from "./../firebase";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Subscriptions from "./Subscriptions";
import db from "./../firebase";
import Search from "./Search";
import CreatePageLink from "./CreatePageLink";

function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const googleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        auth.signInWithPopup(provider)
            .then((result) => {
                handleSignin(result);
                handleNewUser(result);
                setLoading(false);
            })
            .catch((error) => {
                alert(error.message);
                setLoading(false);
            });
    };

    const normalLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        auth.signInWithEmailAndPassword(username, password)
            .then((result) => {
                handleSignin(result);
                handleNewUser(result);
                setLoading(false);
            })
            .catch((error) => {
                alert(error.message);
                setLoading(false);
            });
    };

    const normalRegister = (e) => {
        e.preventDefault();
        setLoading(true);

        auth.createUserWithEmailAndPassword(username, password)
            .then(async (result) => {
                await handleNewUser(result);
                handleSignin(result);
                setLoading(false);
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
        <div className="home">
            {state.user.username === null ? (
                <div className="home__welcome">
                    <h1>Welcome to Creators First!</h1>
                    <h3>
                        The premier platform for connecting your audience with
                        exclusive content.
                    </h3>

                    <div className="home__body">
                        <img alt="creator_image" src={creatorImage1} />

                        <form
                            className="home__input"
                            onSubmit={(e) => normalLogin(e)}
                        >
                            <div className="home__googleLogin">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => googleLogin(e)}
                                    disabled={loading}
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
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Login
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => normalRegister(e)}
                                        disabled={loading}
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
                <>
                    <Search />
                    <Subscriptions />
                    <CreatePageLink />
                </>
            )}
        </div>
    );
}

export default Home;
