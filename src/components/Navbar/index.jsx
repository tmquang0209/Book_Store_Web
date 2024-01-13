// Note: Navbar component
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// import icons
import { FaCaretDown } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoMenuOutline } from "react-icons/io5";

// import components
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

const Navbar = (props) => {
    const { auth } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        console.log(auth);
        if (auth.user?.token) {
            setAccessToken(auth.user.token);
        }
    }, [auth]);

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
                                {!accessToken ? (
                                    <li className="inline-block px-4 py-4 duration-200 hover:text-primary">
                                        <button className="" onClick={() => setIsOpen(true)}>
                                            Login
                                        </button>
                                    </li>
                                ) : (
                                    <li className="group relative cursor-pointer">
                                        <a href="/profile" className="gap[2px] flex h-[72px] items-center">
                                            {auth.user?.first_name + " " + auth.user?.last_name}
                                            <span>
                                                <FaCaretDown className="transition duration-300 group-hover:rotate-180" />
                                            </span>
                                        </a>
                                        {/* dropdown link section */}
                                        <div className="absolute -left-1 z-[10] hidden w-[120px] bg-white p-2 text-black shadow-md group-hover:block">
                                            <ul>
                                                <li>
                                                    <a href="/orders" className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                                                        Orders
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/logout" className="inline-block w-full rounded-md p-2 text-red-600 hover:bg-primary/20">
                                                        Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <div className="sm:hidden">
                                <ul>
                                    <li className="group">
                                        <a href="/#" className="gap[2px] flex h-[72px] items-center text-2xl">
                                            <IoMenuOutline />
                                        </a>
                                        <div className="absolute -left-0 z-[10] hidden w-full bg-white p-2 text-black shadow-md group-hover:block">
                                            <ul>
                                                {Menu.map((item, index) => (
                                                    <li key={item.id}>
                                                        <a href={item.link} className="inline-block px-4 py-4 duration-200 hover:text-primary">
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                                <li className="group relative cursor-pointer">
                                                    <a href="/#" className="gap[2px] flex h-[72px] items-center">
                                                        Quick links
                                                    </a>
                                                    {DropdownLinks.map((item, index) => (
                                                        <li key={index}>
                                                            <a href={item.link} className="inline-block w-full rounded-md p-2 hover:text-primary">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <Modal modal={isOpen} setModal={setIsOpen} headerTitle="Login" body={<LoginForm />} />}
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(Navbar);
