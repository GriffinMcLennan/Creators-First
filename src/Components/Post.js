import React, { useEffect, useState } from "react";
import "./Post.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

function Post({ info: { title, imgURL, description, likes } }) {
    const [likesCnt, setLikesCnt] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        if (!liked) {
            setLikesCnt((numLikes) => numLikes + 1);
        } else {
            setLikesCnt((numLikes) => numLikes - 1);
        }

        setLiked(!liked);
    };

    useEffect(() => {
        setLikesCnt(likes);
    }, []);

    return (
        <div className="post">
            <h1>{title}</h1>
            <img src={imgURL} />
            <div className="post__info">
                <p>{description}</p>

                <div className="post__likes">
                    <div className="post__like" onClick={handleLike}>
                        {!liked ? (
                            <ThumbUpAltOutlinedIcon />
                        ) : (
                            <ThumbUpAltIcon />
                        )}
                        <p>{likesCnt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
