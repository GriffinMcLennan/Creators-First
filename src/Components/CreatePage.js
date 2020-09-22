import React, { useEffect, useState } from "react";
import "./CreatePage.css";
import { useSelector } from "react-redux";
import db from "../firebase";
import CreatePageForm from "./CreatePageForm";

function CreatePage() {
    const state = useSelector((state) => state);
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
            {loading ? <></> : pageExists ? <></> : <CreatePageForm />}
        </div>
    );
}

export default CreatePage;
