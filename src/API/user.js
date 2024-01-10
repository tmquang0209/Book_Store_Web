import axios from "axios";
import url from "./url";
import { LOGIN } from "../components/Store/action";

export const loginUser = (user) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(url.login, user);
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
