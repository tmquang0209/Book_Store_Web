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

export const updateAddress = async (address) => {
    try {
        const accessToken = getAccessToken();
        const response = await axios.post(url.updateAddress, address, {
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

export const changePassword = async (password) => {
    try {
        const accessToken = getAccessToken();
        const response = await axios.post(url.changePassword, password, {
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

export const forgotPassword = async (username) => {
    try {
        const response = await axios.post(url.forgotPassword, { username });
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};

export const verifyCode = async (username, code) => {
    try {
        const response = await axios.post(url.verifyCode, { username, verify_code: Number(code) });
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};

export const createNewPassword = async (username, new_password, confirm_password, verify_code) => {
    try {
        const response = await axios.post(url.createNewPassword, { username, verify_code: Number(verify_code), new_password, confirm_password });
        return response.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};
