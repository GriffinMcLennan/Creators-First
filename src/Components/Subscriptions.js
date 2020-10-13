import React, { useEffect, useState } from "react";
import "./Subscriptions.css";
import { useSelector } from "react-redux";
import CreatorTile from "./CreatorTile";
import db from "./../firebase";
import capitalize from "./../functions/capitalize";

function Subscriptions() {
    const state = useSelector((state) => state);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const getData = async (user) => {
            var userData;

            await db
                .collection("Users")
                .doc(capitalize(user))
                .get()
                .then((info) => {
                    userData = info.data();
                });

            return userData;
        };

        const map = async () => {
            const subUsers = state.user.subscriptions;

            let results = await Promise.all(
                subUsers.map(async (user) => {
                    return await getData(user);
                })
            );

            setSubscriptions(results);
        };

        if (state.user.subscriptions === undefined) {
            return;
        }

        map();
    }, [state]);

    return (
        <div className="subscriptions">
            <h2>Subscriptions:</h2>
            {subscriptions.map((subscription) => (
                <CreatorTile
                    name={subscription.username}
                    username={subscription.username}
                    profileImageURL={subscription.profilePicture}
                    key={subscription.username}
                />
            ))}
        </div>
    );
}

export default Subscriptions;
