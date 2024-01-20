import axios from "axios";

export const getProvinces = async () => {
    try {
        // read from data_provinces.json
        const response = await axios.get("https://vn-open-api-provinces-ruddy.vercel.app/api/?depth=3");
        return response.data;
    } catch (err) {
        console.error(err);
    }
};
