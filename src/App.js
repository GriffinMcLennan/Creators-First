import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Creator from "./Components/Creator";
import Home from "./Components/Home";
import CreatePage from "./Components/CreatePage";
import RegisterPage from "./Components/RegisterPage";

function App() {
    return (
        <div className="app">
            <Header />
            <Switch>
                <Route path="/creator/:creatorId">
                    <Creator />
                </Route>

                <Route path="/create" exact>
                    <CreatePage />
                </Route>

                <Route path="/register" exact>
                    <RegisterPage />
                </Route>

                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
