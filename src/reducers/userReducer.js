const initialState = {
    username: null,
};

const accountInfoReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "SET_USER":
            return { ...payload };
        case "REMOVE_USER":
            return { ...initialState };
        default:
            return state;
    }
};

export default accountInfoReducer;
