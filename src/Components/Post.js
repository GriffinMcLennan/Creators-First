import React, { useEffect, useState } from "react";
import "./Post.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import db from "./../firebase";

function Post({
    info: { title, imgURL, description, likes },
    creatorId,
    postRef,
}) {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    useEffect(() => {
        const query = async () => {
            await db.collection("Users").doc("");
        };

        query();
    }, []);

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
