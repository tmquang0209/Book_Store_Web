import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getCartFromLocalStorage, updateProduct, removeFromCart } from "../../components/Store/Actions/cartAction";

import { HiOutlineTrash } from "react-icons/hi2";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { NO_IMAGE } from "../../components/Constants/images";
import { Card, Typography } from "@material-tailwind/react";
import { currencyFormat } from "../../components/Common/formatNumber";
import { getProductDetail } from "../../API/product";

const head = ["", "Product name", "Qty", "Price", "Total", ""];

const Checkout = (props) => {
    const { auth, cart, getCartFromLocalStorage, updateProduct, removeFromCart } = props;

    const [products, setProducts] = useState([]);
    const total = useRef(0);

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

    const onRemoveFromCart = (product_id) => {
        removeFromCart(product_id);
    };

    useEffect(() => {
        getCartFromLocalStorage();
        getProducts();
    }, []);

    useEffect(() => {
        getProducts();
    }, [cart]);

    return (
        <>
            <Navbar />
            <div className="container my-10">
                <div>
                    {/* list */}
                    <h1 className="mb-3 text-2xl font-bold">Checkout</h1>
                    <Card className="no-scrollbar w-full overflow-auto rounded-md">
                        <table className="w-full table-auto rounded-md">
                            <thead>
                                <tr>
                                    {head.map((item, index) => (
                                        <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                {item}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 && (
                                    <tr className="even:bg-blue-gray-50/50">
                                        <td colSpan={6} className="p-4 text-center">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                No products in cart
                                            </Typography>
                                        </td>
                                    </tr>
                                )}
                                {products &&
                                    products.map((item, index) => (
                                        <tr className="even:bg-blue-gray-50/50" key={index}>
                                            <td className="w-32 p-4">
                                                <img src={item.thumbnail || NO_IMAGE} alt="" className="h-20 w-20 rounded-md object-cover" />
                                            </td>
                                            <td className="p-4">
                                                <a
                                                    href={`/product_details?product_id=${item.product_id}`}
                                                    className="text-blue-gray-700 hover:text-primary"
                                                >
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {item.name}
                                                    </Typography>
                                                </a>
                                            </td>
                                            <td className="p-4 text-center">
                                                <input
                                                    type="number"
                                                    className="w-20 rounded-md border border-blue-gray-100 p-2"
                                                    min={1}
                                                    max={item.max}
                                                    value={item.quantity}
                                                    id={item.product_id}
                                                    onChange={onQuantityChange}
                                                />
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {currencyFormat(item.price)}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {currencyFormat(item.price * item.quantity)}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button className="text-red-500 hover:text-red-700" onClick={() => onRemoveFromCart(item)}>
                                                    <HiOutlineTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                            <tfoot>
                                <tr className="gap-5 border-t">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="py-5 pr-10 text-center font-bold">Total</td>
                                    <td className="text-center font-bold">{currencyFormat(total.current)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </Card>
                    <div className="mt-10 flex w-full justify-end">
                        <button
                            onClick={() => (window.location.href = "/payment")}
                            className="translate rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white"
                            disabled={products.length === 0}
                        >
                            <span>Checkout now</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    cart: state.cart,
});

export default connect(mapStateToProps, { getCartFromLocalStorage, updateProduct, removeFromCart })(Checkout);
