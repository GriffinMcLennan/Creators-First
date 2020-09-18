import React, { useEffect, useState } from "react";
import "./Creator.css";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Post from "./Post";
import db from "./../firebase";
import SubscribeButton from "./SubscribeButton";
import { useSelector } from "react-redux";
import { SentimentSatisfied } from "@material-ui/icons";
//var probe = require("probe-image-size"); Use this for cloud function later

function Creator() {
    const { creatorId } = useParams();
    const [backgroundImage, setBackgroundImage] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [posts, setPosts] = useState([]);
    const [userExists, setUserExists] = useState(false);
    const [loading, setLoading] = useState(true);
    const [subscribed, setSubscribed] = useState(false);
    const state = useSelector((state) => state);

    useEffect(() => {
        const loadUserData = async () => {
            await db
                .collection("Users")
                .doc(creatorId)
                .get()
                .then((doc) => {
                    if (!doc.exists) {
                        setUserExists(false);
                        setLoading(false);
                        return;
                    }
                    let data = doc.data();
                    setBackgroundImage(data.backgroundImage);
                    setProfilePicture(data.profilePicture);
                    setUserExists(true);
                });

            await db
                .collection("Users")
                .doc(creatorId)
                .collection("Posts")
                .get()
                .then((docs) => {
                    setPosts(docs.docs.map((doc) => doc.data()));
                });

            setLoading(false);
        };

        setLoading(true);
        loadUserData();
    }, [creatorId]);

    useEffect(() => {
        //check if user is signed in
        if (state.user.username === null) {
            return;
        }

        let subscriptions = state.user.subscriptions;

        for (let i = 0; i < subscriptions.length; i++) {
            if (subscriptions[i].toLowerCase() === creatorId.toLowerCase()) {
                setSubscribed(true);
            }
        }
    }, [state]);

    /*
     * Load creators {backgroundImage, width, height}, profilePicture,
     *
     * Load posts from {creatorId}
     *
     */

    return (
        <div className="creator">
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <>
                    {userExists ? (
                        <>
                            <div
                                className="creator__bg"
                                style={{
                                    backgroundImage: `url(${backgroundImage})`,
                                }}
                            />

                            <div className="creator__profile">
                                <Avatar src={profilePicture} />
                                <h3>{creatorId}</h3>
                            </div>

                            {!subscribed ? <SubscribeButton /> : <div></div>}

                            <div className="creator__posts">
                                {posts.map((post) => (
                                    <Post info={post} key={post.key} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <h1>User does not exist</h1>
                    )}
                </>
            )}
        </div>
    );
}

export default Creator;
