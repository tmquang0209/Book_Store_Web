import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BestBooks from "./components/BestBooks";
import Banner from "./components/Banner";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TopBooks from "./components/TopBooks";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimoial";
import ViewAll from "./components/ViewAll";
import DetailProduct from "./components/DetailProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route index element={<div className="bg-white duration-200">
                        <Hero />
                        <BestBooks />
                        <Banner />
                        <TopBooks />
                        <Testimonial />
                        <Footer />
                    </div>} />
                    <Route path="viewall" element={<ViewAll />} />
                    <Route path="detailProduct" element={<DetailProduct />} />
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;
