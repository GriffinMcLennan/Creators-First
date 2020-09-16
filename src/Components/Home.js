import React, { useState } from "react";
import "./Home.css";
import creatorImage1 from "./homepage_images/homepage_creator1.jpg";
import TextField from "@material-ui/core/TextField";

function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
    };

    return (
        <div className="home">
            <div className="home__welcome">
                <h1>Welcome to Creators First!</h1>
                <h3>
                    The premier platform for connecting your audience with
                    exclusive content.
                </h3>

                <div className="home__body">
                    <img src={creatorImage1} />

                    <form className="home__input" onSubmit={(e) => login(e)}>
                        <h2>Login or Signup!</h2>
                        <TextField
                            id="outlined-basic"
                            label="Username"
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
                                <button>Login</button>
                                <button>Signup</button>
                            </div>

                            <div className="home__googleLogin">
                                <button>google signin</button>
                            </div>
                        </div>
                    </form>
                </div>

                <h3>
                    At Creators First you receive 10% more money than from the
                    next leading competitor!
                </h3>
            </div>
        </div>
    );
}

export default Home;
