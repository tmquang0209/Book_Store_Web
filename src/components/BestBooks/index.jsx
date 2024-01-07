import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const BestBooks = () => {
    const [books, setBooks] = React.useState([
        {
            id: 1,
            image: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
            title: "His Life",
            description:
                "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 2,
            image: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
            title: "His Life",
            description:
                "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 3,
            image: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
            title: "His Life",
            description:
                "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ]);

    return (
        <>
            <div className="py-10">
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
                        {books.map((service) => (
                            <div data-aos="zoom-in" className="duration-high group relative max-w-[300px] rounded-2xl bg-white shadow-xl">
                                <div className="h-[100px]">
                                    <img
                                        src={service.image}
                                        alt=""
                                        className="mx-auto block max-w-[100px] -translate-y-14 transform shadow-md  duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <div className="flex w-full items-center justify-center gap-1">
                                        <FaStar className="text-yellow-500" />
                                        <FaStar className="text-yellow-500" />
                                        <FaStar className="text-yellow-500" />
                                        <FaStar className="text-yellow-500" />
                                    </div>
                                    <h1 className="text-xl font-bold">{service.title}</h1>
                                    <p className="duration-high line-clamp-2 text-sm text-gray-500 ">{service.description}</p>
                                    <div className="mt-4 grid grid-cols-2 items-center justify-center">
                                        <button className="flex w-full items-center justify-center px-4 py-2 hover:scale-105 hover:bg-primary hover:text-white">
                                            <FiEye />
                                        </button>
                                        <button className="flex w-full items-center justify-center px-4 py-2 hover:scale-105 hover:bg-primary hover:text-white">
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

export default BestBooks;
