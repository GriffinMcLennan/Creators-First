import React, { useState } from "react";
import "./CreatePost.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import { storage } from "./../firebase";
import LinearProgress from "@material-ui/core/LinearProgress";
import firebase from "firebase";
import db from "./../firebase";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import validateImage from "./../functions/validateImage";

function CreatePost({ posts, setPosts }) {
    const [show, setShow] = useState(false);
    const [image, setImage] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    const [done, setDone] = useState(false);
    const [pct, setPct] = useState(0);
    const { creatorId } = useParams();

    const initialize = () => {
        setShow(true);
        setPct(0);
        setUploading(false);
        setImage({});
        setDescription("");
        setTitle("");
        setDone(false);
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            setImage(image);
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    const uploadImage = () => {
        const { valid, extensionType } = validateImage(image);
        if (!valid) {
            return;
        }

        const identifer = uuid();
        const filename = identifer + "." + extensionType;

        const uploadTask = storage.ref(`/${creatorId}/${filename}`).put(image);
        setUploading(true);

        uploadTask.on(
            "state_changed",

            (snapshot) => {
                //console.log(snapshot);
                let pct =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPct(pct);
            },

            (err) => {
                alert(err.message);
            },

            () => {
                storage
                    .ref(`${creatorId}`)
                    .child(filename)
                    .getDownloadURL()
                    .then(async (url) => {
                        uploadPost(url, identifer);
                    });

                setDone(true);
            }
        );
    };

    const uploadPost = async (imgURL, identifier) => {
        await db.collection("Users").doc(creatorId).collection("Posts").add({
            description: description,
            imgURL: imgURL,
            key: identifier,
            likes: 0,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            title: title,
        });

        setPosts([
            {
                description: description,
                imgURL: imgURL,
                key: identifier,
                likes: 0,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                title: title,
            },
            ...posts,
        ]);
    };

    return (
        <div className="createpost">
            <Button
                onClick={() => initialize()}
                variant="contained"
                color="primary"
            >
                Create New Post!
            </Button>

            <Modal
                handleClose={handleClose}
                show={show}
                uploading={uploading && !done}
            >
                <TextField
                    label="Title"
                    variant="filled"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <Input
                    type="file"
                    disableUnderline={true}
                    onChange={(e) => handleChange(e)}
                />
                <Button
                    onClick={() => uploadImage()}
                    variant="contained"
                    color="primary"
                    disabled={uploading}
                >
                    Upload Post!
                </Button>

                {uploading ? (
                    <LinearProgress variant="determinate" value={pct} />
                ) : (
                    <></>
                )}
            </Modal>
        </div>
    );
}

const Modal = ({ handleClose, show, uploading, children }) => {
    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                {children}
                <Button
                    disabled={uploading}
                    color="secondary"
                    variant="contained"
                    onClick={() => handleClose()}
                >
                    close
                </Button>
            </div>
        </div>
    );
};

export default CreatePost;
