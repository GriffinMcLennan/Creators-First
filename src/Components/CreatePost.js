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
//Firebase.ServerValue.TIMESTAMP,

function CreatePost() {
    const [show, setShow] = useState(false);
    const [image, setImage] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    const [pct, setPct] = useState(0);
    const { creatorId } = useParams();

    const initialize = () => {
        setShow(true);
        setPct(0);
        setUploading(false);
        setImage({});
        setDescription("");
        setTitle("");
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
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        setUploading(true);

        uploadTask.on(
            "state_changed",

            (snapshot) => {
                console.log(snapshot);
                let pct =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPct(pct);
            },

            (err) => {
                console.log(err);
            },

            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        uploadPost(url);
                    });
            }
        );
    };

    const uploadPost = async (imgURL) => {
        await db.collection("Users").doc(creatorId).collection("Posts").add({
            description: description,
            imgURL: imgURL,
            key: 10,
            likes: 0,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            title: title,
        });
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

            <Modal handleClose={handleClose} show={show}>
                <TextField
                    label="Title"
                    variant="filled"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={(e) => setDescription(e.target.value)}
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

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button onClick={() => handleClose()}>close</button>
            </section>
        </div>
    );
};

export default CreatePost;
