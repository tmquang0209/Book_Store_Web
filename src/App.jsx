import "./App.css";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { authAccessToken } from "./components/Store/Actions/authActions";

import Home from "./Screen/Home";
import ProductsList from "./Screen/Products/list";
import ProductDetails from "./Screen/Products/detail";
import Checkout from "./Screen/Checkout";
import Payment from "./Screen/Checkout/payment";
import OrdersHistory from "./Screen/OrdersHistory";
import OrderDetails from "./Screen/OrdersHistory/details";
import Profile from "./Screen/Profile";
import Address from "./Screen/Profile/address";

function App(props) {
    const { authAccessToken } = props;

    React.useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);

    useEffect(() => {
        authAccessToken();
    }, [authAccessToken]);

    return (
        <>
            <div className="bg-white duration-200">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductsList />} />
                        <Route path="/product_details" element={<ProductDetails />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/address" element={<Address />} />
                        <Route path="/orders_history" element={<OrdersHistory />} />
                        <Route path="/orders_history/:id" element={<OrderDetails />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { authAccessToken })(App);
