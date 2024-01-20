import React, { useRef } from "react";
import { Drawer, Button, Typography, IconButton } from "@material-tailwind/react";
import { connect } from "react-redux";

import { getCartFromLocalStorage, updateProduct, removeFromCart } from "../Store/Actions/cartAction";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

import { getProductDetail } from "../../API/product";
import { NO_IMAGE } from "../../components/Constants/images";
import { currencyFormat } from "../Common/formatNumber";

const DrawerCart = (props) => {
    const { open, closeDrawer, onLogin, auth, cart, getCartFromLocalStorage, updateProduct, removeFromCart } = props;

    //get cart in local storage
    const [products, setProducts] = React.useState([]);
    const total = useRef(0);

    //get product info from cart
    const getProducts = async () => {
        const tempProducts = [];
        if (cart.cart.length !== 0) {
            for (const item of cart.cart) {
                const response = await getProductDetail(item.product_id);
                const product = response.data;
                product.max = product.quantity.inStock;
                product.quantity = item.quantity;
                tempProducts.push(product);
            }
            setProducts(tempProducts);
            total.current = tempProducts.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        } else {
            setProducts([]);
            total.current = 0;
        }
    };

    // on quantity change
    const onQuantityChange = (e) => {
        const tempProducts = [...products];
        const product_id = Number(e.target.id);
        const quantity = Number(e.target.value);

        const findIndex = tempProducts.findIndex((item) => item.product_id === product_id);
        tempProducts[findIndex].quantity = quantity;

        setProducts(tempProducts);
        // save to local storage
        updateProduct({ product_id, quantity });
        total.current = tempProducts.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    };

    const onPurchasePress = () => {
        window.location.href = "/checkout";
    };

    const onLoginPress = (e) => {
        e.preventDefault();
        onLogin();
    };

    const onRemovePress = (product) => {
        removeFromCart(product);
    };

    React.useEffect(() => {
        getCartFromLocalStorage();
        getProducts();
    }, []);

    React.useEffect(() => {
        getProducts();
    }, [cart]);

    // React.useEffect(() => {}, [products]);

    //display product info in drawer
    return (
        <>
            <React.Fragment>
                <Drawer placement="right" open={open} onClose={closeDrawer} className="p-4" size={400}>
                    <div className="mb-6 flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray">
                            Your Cart
                        </Typography>

                        {/* close button */}
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer} key={"closeButton"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </IconButton>
                    </div>
                    <div className="flex h-full flex-col justify-between">
                        {/* product info */}
                        <div className="no-scrollbar overflow-y-auto pb-20" id="products_list">
                            {products && products.length === 0 && (
                                <div className="flex h-full flex-col items-center justify-center">
                                    <AiOutlineShoppingCart size={100} />
                                    <Typography color="gray" className="text-center">
                                        Your cart is empty
                                    </Typography>
                                </div>
                            )}
                            {products &&
                                products.map((product, index) => (
                                    <div className="mb-4 flex items-center justify-between" key={index}>
                                        <div className="flex gap-4">
                                            <img src={product.thumbnail || NO_IMAGE} alt={product.name} className="h-16 w-16" />
                                            <div>
                                                <Typography color="gray" className="font-bold">
                                                    {product.name}
                                                </Typography>
                                                <div className="flex flex-row">
                                                    <input
                                                        id={product.product_id}
                                                        onChange={onQuantityChange}
                                                        value={product.quantity}
                                                        min={1}
                                                        max={product.max}
                                                        className="w-8"
                                                        type="number"
                                                    />
                                                    <Typography color="gray">x {currencyFormat(product.price)}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <Typography color="gray" className="font-bold">
                                            {currencyFormat(product.price * product.quantity)}
                                        </Typography>
                                        <RiDeleteBinLine
                                            color="red"
                                            size={25}
                                            onClick={() => onRemovePress(product)}
                                            className="hover:cursor-pointer"
                                        />
                                    </div>
                                ))}
                        </div>
                        <div className="sticky bottom-4 w-full bg-white" id="confirm">
                            <div className="my-3 border"></div>
                            <div className="mb-1 flex flex-row justify-between">
                                <span className="text-xl font-bold">Total:</span>
                                <span className="text-xl font-bold text-red-600">{currencyFormat(total.current)}</span>
                            </div>
                            <div className="flex justify-end">
                                <div>
                                    {auth.isAuth ? (
                                        <Button size="sm" color="blue" onClick={onPurchasePress}>
                                            Purchase now
                                        </Button>
                                    ) : (
                                        <Button size="sm" color="blue" onClick={onLoginPress}>
                                            Login to Purchase
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    cart: state.cart,
});

export default connect(mapStateToProps, { getCartFromLocalStorage, updateProduct, removeFromCart })(DrawerCart);
