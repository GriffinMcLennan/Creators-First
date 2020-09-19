import React from "react";
import "./UnsubscribeButton.css";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import db from "./../firebase";

function UnsubscribeButton() {
    const state = useSelector((state) => state);
    const { creatorId } = useParams();
    let dispatch = useDispatch();

    const unsubscribe = async () => {
        if (state.user.username === null) {
            alert("You must be signed in to unsubscribe!");
            return;
        }

        const uid = state.user.data.uid;
        let subscriptions = state.user.subscriptions;

        subscriptions = subscriptions.filter((sub) => sub !== creatorId);

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
        <div className="unsubscribeButton">
            <Button onClick={unsubscribe} variant="contained" color="secondary">
                Unsubscribe
            </Button>
        </div>
    );
}

export default UnsubscribeButton;
