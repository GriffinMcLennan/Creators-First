const validateImage = (img) => {
    if (Object.entries(img) === 0) {
        alert(
            "Please select an image for both profile picture and cover photo"
        );
        return {
            valid: false,
            extensionType: null,
        };
    }
    const jpgExt = "jpg";
    const jpegExt = "jpeg";
    const pngExt = "png";
    const imageParts = img.name.split(".");
    const len = imageParts.length;
    let valid = true;
    let extension = len > 1 ? imageParts[1] : null;

    if (len > 2) {
        alert("Filename contains too many .");
        valid = false;
    } else if (len === 1 || extension === null) {
        alert("Filename must contain an extension type");
        valid = false;
    } else if (
        extension !== jpgExt &&
        extension !== jpegExt &&
        extension !== pngExt
    ) {
        alert("Supported filetypes are .jpeg, .png");
        valid = false;
    }

    if (!valid) {
        return {
            valid: false,
            extensionType: null,
        };
    }

    return {
        valid: valid,
        extensionType: extension,
    };
};

export default validateImage;
