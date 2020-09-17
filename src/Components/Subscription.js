import React from "react";
import "./Subscription.css";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

function Subscription({ name, username, profileImageURL }) {
    const history = useHistory();

    return (
        <div
            className="subscription"
            onClick={() => history.push(`/${username}`)}
        >
            <div className="subscription__info">
                <Avatar src={profileImageURL} />
                <h4>{name}</h4>
            </div>
        </div>
    );
}

export default Subscription;
