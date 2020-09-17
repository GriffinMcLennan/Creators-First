import React from "react";
import "./Header.css";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./../firebase";

function Header() {
    const history = useHistory();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const user = "null";

    const signOut = () => {
        if (user === null) {
            return;
        }

        auth.signOut()
            .then((res) => {
                dispatch({
                    type: "REMOVE_USER",
                    payload: null,
                });
            })
            .catch((error) => console.log("error"));
    };

    return (
        <div className="header">
            <div className="header__icons">
                <HomeIcon onClick={() => history.push("/")} />
                <AccountCircleIcon onClick={signOut} />
            </div>
        </div>
    );
}

export default Header;
