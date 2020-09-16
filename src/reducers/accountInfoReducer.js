const initialState = [
    {
        result: {
            user: {
                displayName: null,
            },
        },
    },
];

const accountInfoReducer = (state = initialState, action) => {
    const { type, payload } = action;
    console.log(type);

    switch (type) {
        case "SET_USER":
            state.accountInfo[0] = { ...payload };
            return state;
        default:
            return state;
    }
};

export default accountInfoReducer;
