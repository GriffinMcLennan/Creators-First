import React from "react";
import "./Header.css";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";

function Header() {
    const history = useHistory();

    return (
        <div className="header">
            <div className="header__icons">
                <HomeIcon onClick={() => history.push("/")} />
                <AccountCircleIcon />
            </div>
        </div>
    );
}

export default Header;
