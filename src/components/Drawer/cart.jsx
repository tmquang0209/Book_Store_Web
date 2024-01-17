import React, { useRef } from "react";
import { Drawer, Button, Typography, IconButton } from "@material-tailwind/react";
import { getCart } from "../LocalStorage";
import { getProductDetail } from "../../API/product";
import { NO_IMAGE } from "../../components/Constants/images";
import { connect } from "react-redux";
import { updateProduct } from "../Store/Actions/cartAction";
import { currencyFormat } from "../Common/formatNumber";

const DrawerCart = ({ open, closeDrawer, cart, updateProduct }) => {
    //get cart in local storage
    const [products, setProducts] = React.useState([]);
    const total = useRef(0);

    //get product info from cart
    const getProducts = async () => {
        const cart = getCart();
        const tempProducts = [];

        for (const item of cart) {
            const response = await getProductDetail(item.product_id);
            const product = response.data;
            product.max = product.quantity.inStock;
            product.quantity = item.quantity;
            tempProducts.push(product);
        }
        setProducts(tempProducts);
        total.current = tempProducts.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    };

    // on quantity change
    const onQuantityChange = (e, index) => {
        const tempProducts = [...products];
        tempProducts[index].quantity = e.target.value;
        setProducts(tempProducts);
        // save to local storage
        updateProduct(tempProducts[index]);
        total.current = tempProducts.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    };

    React.useEffect(() => {
        getProducts();
    }, []);
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
                            {products.map((product, index) => (
                                <div className="mb-4 flex items-center justify-between" key={index}>
                                    <div className="flex gap-4">
                                        <img src={product.thumbnail || NO_IMAGE} alt={product.name} className="h-16 w-16" />
                                        <div>
                                            <Typography color="gray" className="font-bold">
                                                {product.name}
                                            </Typography>
                                            <div className="flex flex-row">
                                                <input
                                                    onChange={(e) => onQuantityChange(e, index)}
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
                                    <Button size="sm" color="blue" onClick={() => console.log("Purchase now")}>
                                        Purchase now
                                    </Button>
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
    cart: state.cart,
});

export default connect(mapStateToProps, { updateProduct })(DrawerCart);
