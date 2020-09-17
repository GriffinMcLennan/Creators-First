import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Creator from "./Components/Creator";
import Home from "./Components/Home";

function App() {
    return (
        <div className="app">
            <Header />
            <Switch>
                <Route path="/:creatorId">
                    <Creator />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
