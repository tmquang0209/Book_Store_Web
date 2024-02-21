const host = "https://book-store-bqe8.onrender.com";

const url = {
    // User
    authToken: `${host}/user/getUserByToken`,
    login: `${host}/user/login`,
    signup: `${host}/user/register`,
    updateUserInfo: `${host}/user/updateUserById`,
    updateAddress: `${host}/user/updateAddress`,
    changePassword: `${host}/user/changePassword`,
    forgotPassword: `${host}/user/forgotPassword`,
    verifyCode: `${host}/user/verifyCode`,
    createNewPassword: `${host}/user/createNewPassword`,

    // banner
    getBanner: `${host}/banner`,
    // category
    getCategory: `${host}/category`,

    // product
    getProduct: `${host}/product`,
    getProductById: (id) => `${host}/product/${id}/detail`,
    getProductByCategory: `${host}/product/productByCategory`,
    getTrendingProducts: `${host}/product/trending`,
    getSimilarProducts: (id) => `${host}/product/similarProducts/${id}`,
    getTopProducts: `${host}/product/topSeller`,

    // review
    getReviewByProduct: (productId) => `${host}/review/reviewProduct/${productId}`,
    getReview: `${host}/review/allReviews`,
    getProductsCanReview: (orderId) => `${host}/review/productsCanReview/${orderId}`,
    userReview: `${host}/review/userReview`,

    // order
    createOrder: `${host}/order/create`,
    getOrders: (userId) => `${host}/order/user/${userId}`,
    getOrderDetails: (orderId) => `${host}/order/${orderId}/detail`,
    updateOrderStatus: (orderId) => `${host}/order/updateStatus/${orderId}`,
    cancelOrder: (orderId) => `${host}/order/${orderId}/cancel`,
};

export default url;
