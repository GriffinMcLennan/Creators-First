import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Creator from "./Components/Creator";

function App() {
    return (
        <div className="app">
            <Header />

            <Switch>
                <Route path="/:creatorId">
                    <Creator />
                </Route>

                <Route path="/">
                    <h1>Homepage</h1>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
