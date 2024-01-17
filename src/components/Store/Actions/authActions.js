import { authToken, loginUser } from "../../../API/user";
import { getAccessToken, removeAccessToken, setAccessToken } from "../../LocalStorage";
import { LOGIN } from "../action";

export const authAccessToken = () => {
    return async (dispatch) => {
        try {
            const storageToken = getAccessToken();
            const response = await authToken(storageToken);
            if (response.success) setAccessToken(response.data.token);
            else removeAccessToken();

            dispatch({
                type: LOGIN,
                payload: response,
            });
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
