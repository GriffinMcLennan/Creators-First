import React from "react";
import "./CreatorTile.css";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

function CreatorTile({ name, username, profileImageURL }) {
    const history = useHistory();

    return (
        <div
            className="creatorTile"
            onClick={() => history.push(`/creator/${username}`)}
        >
            <div className="creatorTile__info">
                <Avatar src={profileImageURL} />
                <h4>{name}</h4>
            </div>
        </div>
    );
}

export default CreatorTile;
