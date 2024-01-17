import { combineReducers } from "redux";
import authReducer from "./authReducers";
import cartReducer from "./cartReducers";

const rootReducer = combineReducers({ auth: authReducer, cart: cartReducer });

export default rootReducer;
