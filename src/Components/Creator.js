import React, { useRef, useEffect } from "react";
import "./Creator.css";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
//var probe = require("probe-image-size"); Use this for cloud function later

const backgroundImage =
    "https://c10.patreonusercontent.com/3/eyJ3IjoxOTIwfQ%3D%3D/patreon-media/p/campaign/1907836/5ac343d426914ed9bd3a869de3414d4f/8.jpg?token-time=1601769600&token-hash=qQ15edEhzj79xuLCPBobEQbXa9LpOsXycCd1v0oqszI%3D";

const profilePicture =
    "https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/campaign/1907836/3654db01e3d64bb1890d751c7364affe/3.png?token-time=2145916800&token-hash=CPFx5ZfMzkcN_CAGFuiuLjGIHn9Baw20_nB9bf3_1uw%3D";

function Creator() {
    const { creatorId } = useParams();

    /*
     * Load creators {backgroundImage, width, height}, profilePicture,
     *
     * Load posts from {creatorId}
     *
     */

    return (
        <div className="creator">
            <div
                className="creator__bg"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            <div className="creator__profile">
                <Avatar src={profilePicture} />
                <h3>Mitch Ray TA</h3>
            </div>

            <div className="creator__posts"></div>
        </div>
    );
}

export default Creator;
