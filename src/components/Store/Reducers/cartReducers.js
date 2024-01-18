import { ADD_TO_CART, CLEAR_CART, GET_CART, REMOVE_FROM_CART, UPDATE_CART } from "../action";

const initialState = {
    cart: [],
    total: 0,
    message: "",
};

export const cartReducer = (state = initialState, action) => {
    console.log(action.type, action.payload?.product_id);
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                cart: action.payload,
            };

        case ADD_TO_CART:
            const index = state.cart.findIndex((item) => item.product_id === action.payload.product_id);
            if (index !== -1) {
                state.cart[index].quantity += Number(action.payload.quantity);
                return {
                    ...state,
                    cart: [...state.cart],
                };
            }
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item.product_id !== action.payload.product_id),
            };

        case UPDATE_CART:
            return {
                ...state,
                cart: state.cart.map((item) => (item.product_id === action.payload.product_id ? action.payload : item)),
            };

        case CLEAR_CART:
            return {
                ...state,
                cart: [],
            };

        default:
            return state;
    }
};

export default cartReducer;
