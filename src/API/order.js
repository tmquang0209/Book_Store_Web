import axios from "axios";
import url from "./url";
import { getAccessToken } from "../components/LocalStorage";

export const createOrder = async (token, order) => {
    try {
        const response = await axios.post(url.createOrder, order, { headers: { Authorization: token } });
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const getOrders = async (userId) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(url.getOrders(userId), { headers: { Authorization: token } });
        return response.data;
    } catch (err) {
        console.error(err);
    }
};
