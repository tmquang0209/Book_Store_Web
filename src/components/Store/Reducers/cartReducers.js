import { ADD_TO_CART, CLEAR_CART, GET_CART, REMOVE_FROM_CART, UPDATE_CART } from "../action";

const initialState = {
    cart: [],
    total: 0,
    message: "",
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                cart: action.payload,
            };

        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.id),
            };

        case UPDATE_CART:
            return {
                ...state,
                cart: state.cart.map((item) => (item.id === action.payload.id ? action.payload : item)),
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
