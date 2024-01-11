import axios from "axios";
import url from "./url";

export const loginUser = async (user) => {
    try {
        const response = await axios.post(url.login, user);

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};
