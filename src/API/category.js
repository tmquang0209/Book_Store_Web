import axios from "axios";
import url from "./url";

export const getCategory = async () => {
    try {
        const response = await axios.get(url.getCategory);
        const responseData = response.data;
        return responseData;
    } catch (err) {
        console.error(err);
    }
};
