import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Search.css";
import db from "./../firebase";
import Subscription from "./Subscription";

function Search() {
    const [searchedUser, setSearchedUser] = useState("");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        db.collection("Users")
            .get()
            .then((data) => {
                setUsers(data.docs.map((user) => user.data()));
            });
    }, []);

    useEffect(() => {
        setFilteredUsers(
            users.filter((user) => user.username.includes(searchedUser))
        );
    }, [searchedUser, users]);

    return (
        <div className="search">
            <div className="search__box">
                <TextField
                    id="outlined-basic"
                    label="Search for a User"
                    variant="outlined"
                    onChange={(e) => setSearchedUser(e.target.value)}
                    autoComplete="off"
                />
            </div>

            <div className="search__results">
                {filteredUsers.map((user) => (
                    <Subscription
                        name={user.username}
                        username={user.username}
                        profileImageURL={user.profilePicture}
                    />
                ))}
            </div>
        </div>
    );
}

export default Search;
