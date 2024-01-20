import { addProductToCart, getCart, removeCart, removeProductFromCart, updateQuantity } from "../../LocalStorage";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, UPDATE_CART, GET_CART } from "../action";

export const getCartFromLocalStorage = () => {
    return (dispatch) => {
        const cart = getCart();
        if (cart) {
            dispatch({
                type: GET_CART,
                payload: cart,
            });
        }
    };
};

export const addToCart = (product) => {
    return (dispatch) => {
        addProductToCart(product);
        dispatch({
            type: ADD_TO_CART,
            payload: product,
        });
    };
};

export const removeFromCart = (product) => {
    return (dispatch) => {
        removeProductFromCart(product);
        dispatch({
            type: REMOVE_FROM_CART,
            payload: product,
        });
    };
};

export const updateProduct = (product) => {
    return (dispatch) => {
        updateQuantity(product);
        dispatch({
            type: UPDATE_CART,
            payload: product,
        });
    };
};

export const clearCart = () => {
    return (dispatch) => {
        removeCart();
        dispatch({
            type: CLEAR_CART,
        });
    };
};
