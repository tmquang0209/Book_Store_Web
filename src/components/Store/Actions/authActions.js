import { authToken, loginUser } from "../../../API/user";
import { getAccessToken, removeAccessToken, setAccessToken } from "../../LocalStorage";
import { LOGIN, UPDATE_INFO } from "../action";

export const authAccessToken = () => {
    return async (dispatch) => {
        try {
            const storageToken = getAccessToken();
            const response = await authToken(storageToken);
            if (response.success) {
                setAccessToken(response.data.token);
                dispatch({
                    type: LOGIN,
                    payload: response,
                });
            } else {
                removeAccessToken();
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const login = (user) => {
    return async (dispatch) => {
        try {
            const response = await loginUser(user);
            if (response.success) setAccessToken(response.data.token);

            dispatch({
                type: LOGIN,
                payload: response,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            removeAccessToken();

            dispatch({
                type: LOGIN,
                payload: { success: false, message: "Logout successfully" },
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const updateInfo = (userInfo) => {
    return async (dispatch) => {
        setAccessToken(userInfo.token);
        dispatch({
            type: UPDATE_INFO,
            payload: userInfo,
        });
    };
};
