import { loginUser } from "../../../API/user";
import { LOGIN } from "../action";

export const login = (user) => {
    return async (dispatch) => {
        try {
            const response = await loginUser(user);
            if (response.status === 200) {
                dispatch({
                    type: LOGIN,
                    payload: response.data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};
