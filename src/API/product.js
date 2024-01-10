import axios from "axios";
import url from "./url";

export const getTrendingProducts = async () => {
    try {
        const response = await axios.get(url.getTrendingProducts);
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const getTopBooks = async () => {
    try {
        const response = await axios.get(url.getTopProducts);
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};
