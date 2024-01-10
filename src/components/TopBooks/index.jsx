import React, { useEffect, useState } from "react";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { getTopBooks } from "../../API/product";
import { NO_IMAGE } from "../Constants/images";

const TopBooks = () => {
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        const response = await getTopBooks();
        const responseData = response.data;
        setBooks(responseData);
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <>
            <div className="py-10" id="topSeller">
                <div className="container">
                    {/* header */}
                    <div data-aos="slide-up" data-aos-duration="300" className="aos-init aos-animate mx-auto mb-20 max-w-[400px] text-center">
                        <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm text-transparent">Best Books</p>
                        <h1 className="text-2xl font-bold sm:text-3xl">Top books</h1>
                        <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa iure, corporis</p>
                    </div>
                    {/* body */}
                    <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {/* item card */}
                        {books.map((book) => (
                            <div data-aos="slide-up" className="group">
                                <div className="relative max-h-[220px]">
                                    <img src={book.thumbnail || NO_IMAGE} alt="" className="h-[220px] w-[150px] rounded-md object-cover shadow-md" />
                                    <div className="absolute bottom-0 left-0 right-0 hidden grid-cols-2 group-hover:grid">
                                        <div className="flex w-full justify-center rounded-bl-md bg-primary py-3 hover:cursor-pointer">
                                            <FiEye className="text-white" />
                                        </div>
                                        <div className="flex w-full justify-center rounded-br-md bg-red-400 py-3 hover:cursor-pointer">
                                            <FaCartPlus className="text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <h1 className="font-semibold">{book.name}</h1>
                                    <p className="text-sm text-gray-700">{book.author || "anonymous"}</p>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: book.rating }).map((_, index) => (
                                            <FaStar key={index} className="text-yellow-500" />
                                        ))}{" "}
                                        {book.rating > 0 && book.rating}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 flex justify-center">
                        <button className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-white">View more</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopBooks;
