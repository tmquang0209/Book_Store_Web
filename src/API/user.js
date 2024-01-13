import axios from "axios";
import url from "./url";

export const authToken = async (token) => {
    try {
        const response = await axios.get(url.authToken, { headers: { Authorization: token } });
        const responseData = response.data;

        const formatResponse = {
            success: responseData.success,
            message: responseData.message,
            data: responseData.data,
        };

        return formatResponse;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};

export const loginUser = async (user) => {
    try {
        const response = await axios.post(url.login, user);

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};

export const signupUser = async (user) => {
    try {
        const response = await axios.post(url.signup, user);

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};
