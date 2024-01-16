import "./App.css";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { authAccessToken } from "./components/Store/Actions/authActions";

import Home from "./Screen/Home";
import Products from "./Screen/Products";
import DetailProduct from "./components/DetailProduct";

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
                        <Route path="/products" element={<Products />} />
                        <Route path="detailProduct" element={<DetailProduct />} />
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
