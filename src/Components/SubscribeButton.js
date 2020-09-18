import React from "react";
import "./SubscribeButton.css";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

function SubscribeButton() {
    const state = useSelector((state) => state);

    return (
        <div className="subscribeButton">
            <Button variant="contained" color="secondary">
                Subscribe to User
            </Button>
        </div>
    );
}

export default SubscribeButton;
