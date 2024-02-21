import { useRef } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";

const menu = [
    {
        id: "profile",
        title: "My Profile",
        path: "/profile",
        icon: <FaRegUser />,
    },
    {
        id: "address",
        title: "My Address",
        path: "/address",
        icon: <FaRegUser />,
    },
    {
        id: "payment",
        title: "Payment Methods",
        path: "/payment_methods",
        icon: <FaRegUser />,
    },
    {
        id: "change_password",
        title: "Change Password",
        path: "/change_password",
        icon: <FaRegUser />,
    },
    {
        id: "history",
        title: "Orders History",
        path: "/orders_history",
        icon: <FiShoppingCart />,
    },
];

const ProfileMenu = () => {
    const url = useRef(window.location.pathname);

    return (
        <>
            <ul className="flex flex-col gap-4 py-10">
                {menu.map((item) => (
                    <li
                        onClick={() => (window.location.href = item.path)}
                        key={item.id}
                        className={`flex items-center gap-2 ${url.current.includes(item.id) ? "text-primary" : "text-gray-700"} hover:cursor-pointer`}
                    >
                        {item.icon}
                        {item.title}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProfileMenu;
