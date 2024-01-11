import React, { useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import ModalOrder from "../ModalOrder";

const Order = () => {
    const [showModal, setShowModal] = useState(false);  // Tạo state để điều khiển việc hiển thị modal

    const openModal = () => {
        setShowModal(true);  // Hàm mở modal
    };

    const closeModal = () => {
        setShowModal(false);  // Hàm đóng modal
    };
    return (
        <li>
            <button onClick={openModal} className="flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-white duration-300 hover:scale-105 hover:cursor-pointer">
                <LuShoppingCart />
                Order
            </button>
            {showModal && <ModalOrder closeModal={closeModal} />}
        </li>
    );
}
export default Order;