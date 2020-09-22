import React, { useEffect, useState } from "react";
import "./CreatePageLink.css";
import { useSelector } from "react-redux";
import db from "../firebase";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

function CreatePageLink() {
    const state = useSelector((state) => state);
    const history = useHistory();
    const [pageExists, setPageExists] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkForPage = async () => {
            setLoading(true);

            const uid = state.user.data.uid;

            let res = await db
                .collection("uidToUser")
                .doc(uid)
                .get()
                .then((res) => res.data().username);

            if (res !== undefined) {
                setPageExists(true);
            }

            setLoading(false);
        };

        checkForPage();
    }, [state]);

    return (
        <div className="createPage">
            {loading ? (
                <></>
            ) : pageExists ? (
                <></>
            ) : (
                <div className="createPage__link">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => history.push("/create")}
                    >
                        Create a Page
                    </Button>
                </div>
            )}
        </div>
    );
}

export default CreatePageLink;
