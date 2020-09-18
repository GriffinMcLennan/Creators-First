import React from "react";
import "./SubscribeButton.css";
import { useSelector } from "react-redux";

function SubscribeButton() {
    const state = useSelector((state) => state);

    return (
        <div className="subscribeButton">
            <button>Subscribe to USERNAME for </button>
        </div>
    );
}

export default SubscribeButton;
