import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import { storage } from "./../firebase";
import LinearProgress from "@material-ui/core/LinearProgress";
import firebase from "firebase";

function CreatePost() {
    const [show, setShow] = useState(false);
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    const [pct, setPct] = useState(0);

    const initialize = () => {
        setShow(true);
        setPct(0);
        setUploading(false);
        setImage({});
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

    const uploadPost = () => {
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
                    .then((url) => console.log(url));
            }
        );
    };

    useEffect(() => {
        console.log(image);
    }, [image]);

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
                <TextField label="Title" variant="filled" />
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                />
                <Input
                    type="file"
                    disableUnderline={true}
                    onChange={(e) => handleChange(e)}
                    value=""
                />
                <Button
                    onClick={() => uploadPost()}
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
