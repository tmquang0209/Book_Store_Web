const host = "https://book-store-bqe8.onrender.com";

const url = {
    // product
    getProduct: `${host}/product/allProducts`,
    getProductById: `${host}/product/productById`,
    getProductByCategory: `${host}/product/productByCategory`,
    getTrendingProducts: `${host}/product/trending`,
    getTopProducts: `${host}/product/topSeller`,
    // review
    getReview: `${host}/review/allReviews`,
};

export default url;
