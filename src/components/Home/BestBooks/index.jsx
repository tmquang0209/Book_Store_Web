import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { addToCart } from "../../Store/Actions/cartAction";

import { FaStar } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

import { getTrendingProducts } from "../../../API/product";
import { NO_IMAGE } from "../../Constants/images";

const BestBooks = (props) => {
    const { addToCart } = props;
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        const response = await getTrendingProducts();
        const responseData = response.data;

        responseData && setBooks(responseData.filter((book, index) => index < 3));
    };

    const onAddToCart = (product) => {
        addToCart({ product_id: product.product_id, quantity: 1 });
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <>
            <div className="py-10" id="trendingBooks">
                <div className="container">
                    <div className="mx-auto mb-20 max-w-[400px] text-center">
                        <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm text-transparent ">Trending Books</p>
                        <h1 data-aos="fade-in" className="text-3xl font-bold">
                            Best Books
                        </h1>
                        <p className="text-xs text-gray-400">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis delectus architecto error nesciunt,
                        </p>
                    </div>
                    <div className="grid grid-cols-1 place-items-center gap-20 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
                        {books &&
                            books.map((service) => (
                                <div
                                    key={service.product_id}
                                    data-aos="zoom-in"
                                    className="duration-high group relative w-full max-w-[300px] rounded-2xl bg-white shadow-xl"
                                >
                                    <div className="h-[100px]">
                                        <img
                                            src={service.thumbnail || NO_IMAGE}
                                            alt=""
                                            className="mx-auto block max-w-[100px] -translate-y-14 transform shadow-md  duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4 text-center">
                                        <div className="flex w-full items-center justify-center gap-1">
                                            {Array.from({ length: service.rating }).map((_, index) => (
                                                <FaStar key={index} className="text-yellow-500" />
                                            ))}
                                        </div>
                                        <h1 className="text-xl font-bold">{service.name}</h1>
                                        <p className="duration-high line-clamp-2 text-sm text-gray-500">{service.description}</p>
                                        <div className="mt-4 grid grid-cols-2 items-center justify-center">
                                            <a
                                                href={`/product_details?product_id=${service.product_id}`}
                                                className="flex w-full items-center justify-center px-4 py-2 hover:scale-105 hover:bg-primary hover:text-white"
                                            >
                                                <FiEye />
                                            </a>
                                            <button
                                                onClick={() => onAddToCart(service)}
                                                className="flex w-full items-center justify-center px-4 py-2 hover:scale-105 hover:bg-primary hover:text-white"
                                            >
                                                <FaCartPlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProp = (state) => ({
    cart: state.cart,
});

export default connect(mapStateToProp, { addToCart })(BestBooks);
