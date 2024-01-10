import axios from "axios";
import url from "./url";

export const getAllBanners = async () => {
    try {
        const res = await axios.get(url.getBanner);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};
