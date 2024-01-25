import axios from "axios";
import url from "./url";
import { getAccessToken } from "../components/LocalStorage";

export const authToken = async () => {
    try {
        const token = getAccessToken();
        const response = await axios.get(url.authToken, { headers: { Authorization: token } });
        const responseData = response.data;

        return responseData;
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

export const updateUserInfo = async (userInfo) => {
    try {
        console.log(userInfo);
        const accessToken = getAccessToken();
        const response = await axios.put(url.updateUserInfo, userInfo, {
            headers: {
                Authorization: accessToken,
            },
        });

        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};
