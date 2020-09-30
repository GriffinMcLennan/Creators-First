import React, { useEffect, useState } from "react";
import "./CreatePage.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import db from "./../firebase";
import capitalize from "./../functions/capitalize";
import validateImage from "./../functions/validateImage";
import LinearProgress from "@material-ui/core/LinearProgress";
import { v4 as uuid } from "uuid";
import { storage } from "./../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const uploadStyle = {
    margin: "5px",
};

//add in checks to make sure user is logged in and user doesn't have a page created yet. Add those to functions folder.
function CreatePage() {
    const [username, setUsername] = useState("");
    const [coverPhoto, setCoverPhoto] = useState({});
    const [profilePicture, setProfilePicture] = useState({});
    const [up1Pct, setUp1Pct] = useState(-1);
    const [up2Pct, setUp2Pct] = useState(-1);
    const [validUser, setValidUser] = useState(false);
    const state = useSelector((state) => state);
    const history = useHistory();

    useEffect(() => {
        const checkUser = async () => {
            //check if user isn't signed in
            if (state.user.username === null) {
                return;
            }

            const uid = state.user.data.uid;
            //console.log(uid);
            //check if user already has a profile
            let res = await db
                .collection("uidToUser")
                .doc(uid)
                .get()
                .then((doc) => {
                    //console.log(doc.data());
                    return doc.data();
                });

            if (res.hasOwnProperty("username")) {
                return;
            }

            setValidUser(true);
        };

        checkUser();
    }, [state]);

    const handleChange = (e, setImage) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //first make sure that username isn't taken.
        const realUsername = capitalize(username.toLowerCase().trim());

        if (realUsername === "") {
            alert("Please enter a page name!");
            return;
        }

        const taken = await db
            .collection("Users")
            .doc(realUsername)
            .get()
            .then((res) => res.data());

        if (taken !== undefined) {
            alert(
                `Page ${username} already taken! Please select a new page name.`
            );
            return;
        }

        //upload first photo, store URL
        const coverPhotoURL = await uploadImage(
            realUsername,
            coverPhoto,
            setUp1Pct
        ); //also pass in update method

        //upload second photo, store URL
        const profilePictureURL = await uploadImage(
            realUsername,
            profilePicture,
            setUp2Pct
        );

        //create page, add pagename to collection("uidToUser").(uid).username=pagename
        db.collection("Users").doc(realUsername).set({
            backgroundImage: coverPhotoURL,
            profilePicture: profilePictureURL,
            username: realUsername,
        });
        const uid = state.user.data.uid;

        db.collection("uidToUser").doc(uid).set(
            {
                username: realUsername,
            },
            { merge: true }
        );

        history.push(`/creator/${realUsername}`);
    };

    const uploadImage = async (username, image, setUploadPct) => {
        const { valid, extensionType } = validateImage(image);

        if (!valid) {
            return;
        }

        const imgURL = await performUploadTask(
            username,
            image,
            setUploadPct,
            extensionType
        );

        return imgURL;
    };

    const performUploadTask = async (
        username,
        image,
        setUploadPct,
        extensionType
    ) => {
        return new Promise((resolve, reject) => {
            const identifer = uuid();
            const filename = identifer + "." + extensionType;
            const storageRef = storage.ref(`${username}/${filename}`);
            const uploadTask = storageRef.put(image);
            setUploadPct(0);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    let pct =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadPct(pct);
                },

                (err) => {
                    alert(err.message);
                    reject();
                },

                () => {
                    storage
                        .ref(`${username}`)
                        .child(filename)
                        .getDownloadURL()
                        .then((url) => resolve(url));
                }
            );
        });
    };

    return (
        <div className="createPage">
            {validUser ? (
                <form
                    className="input__container"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <TextField
                        id="standard-basic"
                        label="Page Name"
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <div className="image__container">
                        <p>Cover Photo:</p>
                        <Input
                            type="file"
                            onChange={(e) => handleChange(e, setCoverPhoto)}
                            style={{ flex: 1 }}
                        />
                    </div>

                    {up1Pct !== -1 ? (
                        <LinearProgress
                            variant="determinate"
                            value={up1Pct}
                            style={uploadStyle}
                        />
                    ) : (
                        <></>
                    )}

                    <div className="image__container">
                        <p>Profile Picture:</p>
                        <Input
                            type="file"
                            onChange={(e) => handleChange(e, setProfilePicture)}
                            style={{ flex: 1 }}
                        />
                    </div>

                    {up2Pct !== -1 ? (
                        <LinearProgress
                            variant="determinate"
                            value={up2Pct}
                            style={uploadStyle}
                        />
                    ) : (
                        <></>
                    )}

                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Create Page
                    </Button>
                </form>
            ) : (
                <></>
            )}
        </div>
    );
}

export default CreatePage;
