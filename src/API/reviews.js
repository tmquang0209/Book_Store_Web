import axios from "axios";
import url from "./url";
import { getAccessToken } from "../components/LocalStorage";

export const getAllReviews = async () => {
    try {
        const response = await axios.get(url.getReview);
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const getProductsCanReview = async (orderId) => {
    try {
        const accessToken = getAccessToken();
        const response = await axios.get(url.getProductsCanReview(orderId), { headers: { Authorization: accessToken } });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};

export const submitReview = async (data) => {
    try {
        console.log(data.reviews);
        const accessToken = getAccessToken();
        const response = await axios.post(url.userReview, data, { headers: { Authorization: accessToken } });
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
        return err.response.data;
    }
};
