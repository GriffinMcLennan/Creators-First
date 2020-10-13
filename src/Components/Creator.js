import React, { useEffect, useState } from "react";
import "./Creator.css";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Post from "./Post";
import db from "./../firebase";
import SubscribeButton from "./SubscribeButton";
import UnsubscribeButton from "./UnsubscribeButton";
import { useSelector } from "react-redux";
import logo from "./loading_images/logo.svg";
import capitalize from "./../functions/capitalize";
import CreatePost from "./CreatePost";
//var probe = require("probe-image-size"); Use this for cloud function later

function Creator() {
    const { creatorId } = useParams();
    const [backgroundImage, setBackgroundImage] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [posts, setPosts] = useState([]);
    const [userExists, setUserExists] = useState(false);
    const [loading, setLoading] = useState(true);
    const [subscribed, setSubscribed] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const state = useSelector((state) => state);

    useEffect(() => {
        const loadUserData = async () => {
            setSubscribed(false);
            let ownPage = false;

            if (state.user.username !== null) {
                const uid = state.user.data.uid;
                //console.log(uid);

                await db
                    .collection("uidToUser")
                    .doc(uid)
                    .get()
                    .then((doc) => {
                        //console.log(doc.data().username, creatorId);
                        if (!doc.exists || doc.data().username === undefined) {
                            setIsUser(false);
                        } else if (
                            capitalize(doc.data().username) === creatorId
                        ) {
                            ownPage = true;
                            setIsUser(true);
                        } else {
                            setIsUser(false);
                        }
                    });
            }

            await db
                .collection("Users")
                .doc(creatorId)
                .get()
                .then((doc) => {
                    if (!doc.exists) {
                        setUserExists(false);
                        setLoading(false);
                        console.log(creatorId);
                        return;
                    }
                    let data = doc.data();
                    setBackgroundImage(data.backgroundImage);
                    setProfilePicture(data.profilePicture);
                    setUserExists(true);
                });

            if (state.user.username === null) {
                setLoading(false);
                return;
            }

            let found = false;

            if (!ownPage) {
                let subscriptions = state.user.subscriptions;

                for (let i = 0; i < subscriptions.length; i++) {
                    if (
                        subscriptions[i].toLowerCase() ===
                        creatorId.toLowerCase()
                    ) {
                        setSubscribed(true);
                        found = true;
                    }
                }
            } else {
                found = true;
            }

            if (!found) {
                setLoading(false);
                return;
            }

            await db
                .collection("Users")
                .doc(creatorId)
                .collection("Posts")
                .orderBy("time", "desc")
                .get()
                .then((docs) => {
                    setPosts(
                        docs.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    );
                });

            setLoading(false);
        };

        setLoading(true);
        loadUserData();
    }, [creatorId, state]);

    const clearPosts = () => {
        setPosts([]);
    };

    return (
        <div className="creator">
            {loading ? (
                <img src={logo} className="app__logo" alt="logo" />
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

                            {isUser ? (
                                <CreatePost posts={posts} setPosts={setPosts} />
                            ) : !subscribed ? (
                                <SubscribeButton />
                            ) : (
                                <UnsubscribeButton clearPosts={clearPosts} />
                            )}

                            <div className="creator__posts">
                                {posts.map((post) => (
                                    <Post
                                        info={post.data}
                                        key={post.data.key}
                                        postRef={post.id}
                                        creatorId={creatorId}
                                        uid={state.user.data.uid}
                                    />
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
