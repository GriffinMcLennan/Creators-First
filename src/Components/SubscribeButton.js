import React, { useEffect } from "react";
import "./SubscribeButton.css";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import db from "../firebase";
import { useParams } from "react-router-dom";

function SubscribeButton() {
    const state = useSelector((state) => state);
    const { creatorId } = useParams();
    let dispatch = useDispatch();

    const subscribe = async () => {
        if (state.user.username === null) {
            alert("You must be signed in to subscribe");
            return;
        }

        let uid = state.user.data.uid;
        var subscriptions;

        await db
            .collection("uidToUser")
            .doc(uid)
            .get()
            .then((doc) => (subscriptions = doc.data().subscriptions));

        subscriptions.push(creatorId);

        await db.collection("uidToUser").doc(uid).set({
            subscriptions: subscriptions,
        });

        dispatch({
            type: "SET_SUBSCRIPTIONS",
            payload: {
                subscriptions,
            },
        });
    };

    return (
        <div className="subscribeButton">
            <Button onClick={subscribe} variant="contained" color="secondary">
                Subscribe to see User's Posts
            </Button>
        </div>
    );
}

export default SubscribeButton;
