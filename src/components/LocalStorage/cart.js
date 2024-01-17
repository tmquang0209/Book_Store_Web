export const setCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const addProductToCart = (product) => {
    const cart = getCart();
    if (cart) {
        const index = cart.findIndex((item) => item.product_id === product.product_id);

        if (index !== -1) {
            cart[index].quantity += Number(product.quantity);
        } else {
            cart.push(product);
        }
        setCart(cart);
    } else {
        setCart([product]);
    }
};

export const updateQuantity = (product) => {
    const cart = getCart();
    const index = cart.findIndex((item) => item.product_id === product.product_id);
    cart[index].quantity = Number(product.quantity);
    setCart(cart);
};

export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart"));
};

export const removeCart = () => {
    localStorage.removeItem("cart");
};
