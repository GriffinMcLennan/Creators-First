import React from "react";
import "./Subscriptions.css";
import { useSelector } from "react-redux";
import Subscription from "./Subscription";

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

function Subscriptions() {
    const uid = useSelector((state) => state.user.data.uid);
    //console.log(uid);

    return (
        <div className="subscriptions">
            <h2>Subscriptions:</h2>
            {subscriptions.map((subscription) => (
                <Subscription
                    name={subscription.name}
                    username={subscription.username}
                    profileImageURL={subscription.profileImageURL}
                />
            ))}
        </div>
    );
}

export default Subscriptions;
