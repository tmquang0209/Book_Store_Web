import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Modal } from "../Modal";
import LoginForm from "./loginForm";

const Menu = [
    {
        id: 1,
        name: "Home",
        link: "/#",
    },
    {
        id: 2,
        name: "Best Seller",
        link: "/#topSeller",
    },
];

const DropdownLinks = [
    {
        name: "Trending books",
        link: "/#trendingBooks",
    },
    {
        name: "Best selling",
        link: "/#topSeller",
    },
    {
        name: "Authors",
        link: "/#",
    },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <div className="shadow-lg">
                <div className="sm-y:0 container py-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <a href="/" className="flex items-center justify-center gap-2 align-middle text-2xl font-bold sm:text-3xl">
                                <img src="/logo-tlu.svg" className="w-10" alt="Logo" />
                                Books
                            </a>
                        </div>
                        <div>
                            <ul className="hidden items-center gap-4 sm:flex">
                                {Menu.map((item, index) => (
                                    <li key={item.id}>
                                        <a href={item.link} className="inline-block px-4 py-4 duration-200 hover:text-primary">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                                {/* dropdown section */}
                                <li className="group relative cursor-pointer">
                                    <a href="/#" className="gap[2px] flex h-[72px] items-center">
                                        Quick links
                                        <span>
                                            <FaCaretDown className="transition duration-300 group-hover:rotate-180" />
                                        </span>
                                    </a>
                                    {/* dropdown link section */}
                                    <div className="absolute -left-9 z-[10] hidden bg-white p-2 text-black shadow-md group-hover:block">
                                        <ul>
                                            {DropdownLinks.map((item, index) => (
                                                <li key={index}>
                                                    <a href={item.link} className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <button className="flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-white duration-300 hover:scale-105 hover:cursor-pointer">
                                        <LuShoppingCart />
                                        Order
                                    </button>
                                </li>
                                {/* account */}
                                <li className="inline-block px-4 py-4 duration-200 hover:text-primary">
                                    <button className="" onClick={() => setIsOpen(true)}>
                                        Login
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <Modal modal={isOpen} setModal={setIsOpen} headerTitle="Login" body={<LoginForm />} />}
        </>
    );
};

export default Navbar;
