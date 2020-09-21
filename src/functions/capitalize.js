const capitalize = (word) => {
    if (word.length === 0) {
        return word;
    } else if (word.length === 1) {
        return word.charAt(0).toUpperCase();
    } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
};

export default capitalize;
