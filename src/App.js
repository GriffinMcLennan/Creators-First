import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <div className="app">
            {/* Header Component */}

            <Router>
                <Switch>
                    <Route path="/:creatorName">
                        <h1>Welcome to a creator Page</h1>
                    </Route>
                    <Route path="/">
                        <h1>Homepage</h1>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
