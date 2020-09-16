import { combineReducers } from "redux";
import accountInfoReducer from "./accountInfoReducer";

const rootReducer = combineReducers({
    accountInfo: accountInfoReducer,
});

export default rootReducer;
