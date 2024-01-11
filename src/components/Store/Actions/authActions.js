import { loginUser } from "../../../API/user";
import { setAccessToken } from "../../LocalStorage";
import { LOGIN } from "../action";

export const login = (user) => {
    return async (dispatch) => {
        try {
            console.log(user);
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
