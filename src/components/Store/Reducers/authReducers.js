import { LOGIN } from "../action";

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

        default:
            return state;
    }
};

export default authReducer;
