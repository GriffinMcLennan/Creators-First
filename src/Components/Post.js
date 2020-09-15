import React from "react";
import "./Post.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

function Post({ info: { title, imgURL, description, likes } }) {
    return (
        <div className="post">
            <h1>{title}</h1>
            <img src={imgURL} />
            <h3>{description}</h3>
            <h4>
                <ThumbUpAltIcon /> {likes}
            </h4>
        </div>
    );
}

export default Post;
