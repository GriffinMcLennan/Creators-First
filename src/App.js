import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Creator from "./Components/Creator";
import Home from "./Components/Home";
import { useSelector } from "react-redux";

function App() {
    const state = useSelector((state) => state);
    //console.log(state);

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <div className="app">
            <Header />
            {state?.accountInfo[0]?.result.user === null ? (
                <Switch>
                    <Route path="/:creatorId">
                        <Creator />
                    </Route>

                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            ) : (
                <h1>You are signed in</h1>
            )}
        </div>
    );
}

export default App;
