import React, { useEffect, useState } from "react";
import "./Post.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import db from "./../firebase";

function Post({
    info: { title, imgURL, description, likes },
    creatorId,
    postRef,
    uid,
}) {
    const [liked, setLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(0);

    console.log(liked);

    const handleLike = () => {
        if (liked) {
            setLiked(false);
            db.collection("Users")
                .doc(creatorId)
                .collection("Posts")
                .doc(postRef)
                .collection("likedBy")
                .where("uid", "==", uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, doc.data());
                        db.collection("Users")
                            .doc(creatorId)
                            .collection("Posts")
                            .doc(postRef)
                            .collection("likedBy")
                            .doc(doc.id)
                            .delete();
                    });
                });

            adjustLikeCount(-1);
        } else {
            db.collection("Users")
                .doc(creatorId)
                .collection("Posts")
                .doc(postRef)
                .collection("likedBy")
                .add({
                    uid: uid,
                });

            adjustLikeCount(1);

            setLiked(true);
        }
    };

    const adjustLikeCount = (num) => {
        setNumLikes((liked) => liked + num);

        db.collection("Users")
            .doc(creatorId)
            .collection("Posts")
            .doc(postRef)
            .get()
            .then((doc) => {
                db.collection("Users")
                    .doc(creatorId)
                    .collection("Posts")
                    .doc(postRef)
                    .set(
                        {
                            likes: doc.data().likes + num,
                        },
                        { merge: true }
                    );
            });
    };

    useEffect(() => {
        const query = async () => {
            await db
                .collection("Users")
                .doc(creatorId)
                .collection("Posts")
                .doc(postRef)
                .collection("likedBy")
                .where("uid", "==", uid)
                .get()
                .then((snapshot) => {
                    if (!snapshot.empty) {
                        setLiked(true);
                    }
                });
        };

        setNumLikes(likes);
        query();
    }, [creatorId, postRef, likes, uid]);

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
                        <p>{numLikes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
