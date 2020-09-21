import React, { useState } from "react";
import "./CreatePost.css";
import Button from "@material-ui/core/Button";

function CreatePost() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    return (
        <div className="createpost">
            <Button
                onClick={() => setShow(true)}
                variant="contained"
                color="primary"
            >
                Create New Post!
            </Button>

            <Modal handleClose={handleClose} show={show}>
                <p>Model</p>
                <p>Data</p>
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
