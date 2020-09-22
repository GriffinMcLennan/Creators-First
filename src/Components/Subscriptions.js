import React, { useEffect, useState } from "react";
import "./Subscriptions.css";
import { useSelector } from "react-redux";
import CreatorTile from "./CreatorTile";
import db from "./../firebase";
import capitalize from "./../functions/capitalize";

/*
const subscriptionObj1 = {
    name: "Tyler",
    username: "Tyler",
    profileImageURL:
        "https://images.unsplash.com/photo-1496869836330-cd25f013c377?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
};

const subscriptionObj2 = {
    name: "Thomas",
    username: "Thomas",
    profileImageURL:
        "https://images.unsplash.com/photo-1491743715344-d5eed2a9c5bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
};

const subscriptions = [subscriptionObj1, subscriptionObj2];
*/

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
