import React from "react";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
const TopBooks = () => {
    return (
        <>
            <div className="py-10">
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
                        <div data-aos="slide-up" className="group">
                            <div className="relative max-h-[220px]">
                                <img
                                    src="https://bookstore-tcj.netlify.app/assets/library-jI5gRUk5.jpg"
                                    alt=""
                                    className="h-[220px] w-[150px] rounded-md object-cover shadow-md"
                                />
                                <div className="absolute bottom-0 left-0 right-0 hidden grid-cols-2 group-hover:grid">
                                    <div className="flex w-full justify-center rounded-bl-md bg-primary py-3">
                                        <FiEye className="text-white" />
                                    </div>
                                    <div className="flex w-full justify-center rounded-br-md bg-red-400 py-3">
                                        <FaCartPlus className="text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <h1 className="font-semibold">Book name</h1>
                                <p className="text-sm text-gray-700">Author</p>
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-500" /> 5.0
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center1">
                        <button className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-white"><Link to="/viewall">View All Books</Link></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopBooks;
