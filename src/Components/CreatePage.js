import React, { useState } from "react";
import "./CreatePage.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

function CreatePage() {
    const [username, setUsername] = useState("");

    return (
        <div className="createPage">
            <form className="input__container">
                <TextField
                    id="standard-basic"
                    label="Page Name"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <div className="image__container">
                    <p>Cover Photo:</p>
                    <Input type="file" style={{ flex: 1 }} />
                </div>

                <div className="image__container">
                    <p>Profile Picture:</p>
                    <Input type="file" style={{ flex: 1 }} />
                </div>

                <Button type="submit" color="primary" variant="contained">
                    Create Page
                </Button>
            </form>
        </div>
    );
}

export default CreatePage;
