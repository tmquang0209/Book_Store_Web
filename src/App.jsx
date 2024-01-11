import "./App.css";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Screen/Home";
import Products from "./Screen/Products";
import ViewAll from "./components/ViewAll";
import DetailProduct from "./components/DetailProduct";


function App() {
    React.useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);

    return (
        <>
            <div className="bg-white duration-200">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="viewall" element={<ViewAll />} />
                    <Route path="detailProduct" element={<DetailProduct />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>

    );
}

export default App;
