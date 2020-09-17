import React, { useState } from "react";
import "./Post.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

function Post({ info: { title, imgURL, description, likes } }) {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <div className="post">
            <h1>{title}</h1>
            <img src={imgURL} alt="post_img" />
            <div className="post__info">
                <p>{description}</p>

                <div className="post__likes">
                    <div className="post__like" onClick={handleLike}>
                        {!liked ? (
                            <ThumbUpAltOutlinedIcon />
                        ) : (
                            <ThumbUpAltIcon />
                        )}
                        <p>{liked ? likes + 1 : likes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
