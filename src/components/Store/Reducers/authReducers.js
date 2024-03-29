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
                user: action.payload.data,
                isAuth: action.payload.success,
                message: action.payload.message,
            };

        case UPDATE_INFO:
            return {
                ...state,
                user: action.payload,
            };

        case LOGOUT:
            return { user: "", isAuth: false, message: "" };

        default:
            return state;
    }
};

export default authReducer;
