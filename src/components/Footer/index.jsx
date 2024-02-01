import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";

const FooterLinks = [
    {
        title: "Home",
        link: "/#",
    },
    {
        title: "About",
        link: "/#about",
    },
    {
        title: "Contact",
        link: "/#contact",
    },
    {
        title: "Blog",
        link: "/#blog",
    },
];
const Footer = () => {
    return (
        <div className="bg-gray-100">
            <section className="container">
                <div className=" grid py-5 md:grid-cols-3">
                    {/* company Details */}
                    <div className=" px-4 py-8 ">
                        <h1 className="mb-3 flex items-center gap-3 text-justify text-xl font-bold sm:text-left sm:text-3xl">
                            {/* <img src={} alt="Logo" className="max-w-[50px]" /> */}
                            Books Store
                        </h1>
                        <p className="">
                            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, voluptate.{" "}
                        </p>
                        <br />
                        <div className="flex items-center gap-3">
                            <FaLocationArrow />
                            <p>Noida, Uttar Pradesh</p>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                            <FaMobileAlt />
                            <p>+91 123456789</p>
                        </div>
                        {/* Social Handle */}
                        <div className="mt-6 flex items-center gap-3">
                            <a href="#">
                                <FaInstagram className="text-3xl" />
                            </a>
                            <a href="#">
                                <FaFacebook className="text-3xl" />
                            </a>
                            <a href="#">
                                <FaLinkedin className="text-3xl" />
                            </a>
                        </div>
                    </div>
                    {/* Links */}
                    <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10 ">
                        <div className="">
                            <div className="px-4 py-8 ">
                                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">Important Links</h1>
                                <ul className={`flex flex-col gap-3`}>
                                    {FooterLinks.map((link) => (
                                        <li className="cursor-pointer space-x-1 text-gray-500 duration-300 hover:translate-x-1 hover:text-primary">
                                            <span>&#11162;</span>
                                            <span>{link.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="px-4 py-8 ">
                                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">Links</h1>
                                <ul className="flex flex-col gap-3">
                                    {FooterLinks.map((link) => (
                                        <li className="cursor-pointer space-x-1 text-gray-500 duration-300 hover:translate-x-1 hover:text-primary">
                                            <span>&#11162;</span>
                                            <span>{link.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div className="px-4 py-8 ">
                                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">Location</h1>
                                {/* <ul className="list-disc list-inside"> */}
                                <ul className="flex flex-col gap-3">
                                    {FooterLinks.map((link) => (
                                        <li className="cursor-pointer space-x-1 text-gray-500 duration-300 hover:translate-x-1 hover:text-primary">
                                            <span>&#11162;</span>
                                            <span>{link.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="border-t-2 border-gray-300/50 py-10 text-center">
                        @copyright 2024 All rights reserved || Made with ❤️ by Dilshad
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;
