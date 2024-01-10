import { LOGIN, LOGOUT, UPDATE_INFO } from "../action";

const initialState = {
    user: {},
    isAuth: false,
    message: "",
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                isAuth: action.payload.isAuth,
                message: action.payload.message,
            };

        case UPDATE_INFO:
            return {
                ...state,
                user: action.payload,
                isAuth: action.payload.isAuth,
                message: action.payload.message,
            };

        case LOGOUT:
            return { user: "", isAuth: false, message: "" };

        default:
            return state;
    }
};

export default authReducer;
