const host = "https://book-store-bqe8.onrender.com";

const url = {
    // User
    authToken: `${host}/user/getUserByToken`,
    login: `${host}/user/login`,
    signup: `${host}/user/register`,
    // banner
    getBanner: `${host}/banner`,
    // category
    getCategory: `${host}/category`,

    // product
    getProduct: `${host}/product`,
    getProductById: `${host}/product/productById`,
    getProductByCategory: `${host}/product/productByCategory`,
    getTrendingProducts: `${host}/product/trending`,
    getTopProducts: `${host}/product/topSeller`,
    // review
    getReview: `${host}/review/allReviews`,
};

export default url;
