import axios from "axios";
import url from "./url";

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
