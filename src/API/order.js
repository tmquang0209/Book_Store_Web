import axios from "axios";
import url from "./url";

export const createOrder = async (token, order) => {
    try {
        const response = await axios.post(url.createOrder, order, { headers: { Authorization: token } });
        return response.data;
    } catch (err) {
        console.error(err);
    }
};
