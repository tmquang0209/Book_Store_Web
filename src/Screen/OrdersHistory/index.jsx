import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfileMenu from "../../components/Navbar/profileMenu";
import { Typography } from "@material-tailwind/react";
import { currencyFormat } from "../../components/Common/formatNumber";
import { cancelOrder, getOrders } from "../../API/order";
import { fullDate } from "../../components/Common/date";
import { orderStatus } from "../../components/Constants/text";
import CancelModal from "./cancelModal";
import { getProductsCanReview } from "../../API/reviews";

const head = ["No", "Date", "Status", "Total", ""];

const StatusLabel = ({ status }) => {
    let bgColor = "";
    let textColor = "text-white";
    switch (status) {
        case orderStatus.PENDING:
            bgColor = "bg-yellow-400";
            textColor = "text-[#856404]";
            break;
        case orderStatus.CONFIRMED:
            bgColor = "bg-blue-400";
            textColor = "text-[#0c5460]";
            break;
        case orderStatus.DELIVERED:
            bgColor = "bg-green-400";
            textColor = "text-[#155724]";
            break;
        case orderStatus.CANCELED:
            bgColor = "bg-red-400";
            textColor = "text-[#721c24]";
            break;
        default:
            bgColor = "bg-yellow-400";
            textColor = "text-[#856404]";
    }
    return (
        <span key={status} className={`rounded-full px-2 py-1 text-xs font-bold ${textColor} ${bgColor}`}>
            {status}
        </span>
    );
};

const OrdersHistory = (props) => {
    const { auth } = props;

    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const orderId = useRef(null);

    const fetchOrderList = async (userId) => {
        const res = await getOrders(userId);
        res.success && setOrders(res.data);
    };

    const handleOpen = () => setOpen((prev) => !prev);

    const handleCancel = async () => {
        const res = await cancelOrder(orderId.current);
        if (res.success) {
            fetchOrderList(auth.user.user_id);
            handleOpen();
        }
    };

    // check can review
    const checkCanReview = async (orderId) => {
        const res = await getProductsCanReview(orderId);
        const data = res.data;
        return data.length > 0;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!auth.isAuth) {
                window.location.href = "/";
            } else {
                fetchOrderList(auth.user.user_id);
            }
        }, 1000);

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [auth.isAuth, auth.user]);

    return (
        <>
            <Navbar />
            <div className="container my-10">
                <div className="flex flex-col sm:flex-row">
                    <div className="w-[300px] px-10 sm:border-r">
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <h2>{auth.user.first_name}</h2>
                        <ProfileMenu />
                    </div>
                    <div id="detail" className="ml-5 flex w-full flex-col pr-10">
                        <h1 className="text-2xl font-bold">Orders History</h1>
                        <hr className="py-2" />
                        <div className="no-scrollbar w-full overflow-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        {head.map((item, index) => (
                                            <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                    {item}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {orders.length === 0 && (
                                        <tr className="even:bg-blue-gray-50/50">
                                            <td className="p-4 text-center" colSpan={head.length}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    No data found
                                                </Typography>
                                            </td>
                                        </tr>
                                    )}
                                    {orders &&
                                        orders.map((item, index) => (
                                            <tr className="even:bg-blue-gray-50/50" key={index}>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {item.order_id}
                                                    </Typography>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {fullDate(item.created_at)}
                                                    </Typography>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <StatusLabel status={item.status} />
                                                </td>
                                                <td className="p-4 text-center">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {currencyFormat(
                                                            item.products.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0),
                                                        )}
                                                    </Typography>
                                                </td>
                                                <td className="m-2 grid gap-2">
                                                    <a href={`/orders_history/${item.order_id}`}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-2 text-center font-normal text-white"
                                                        >
                                                            Detail
                                                        </Typography>
                                                    </a>
                                                    {item.status === orderStatus.PENDING && (
                                                        <button
                                                            onClick={() => {
                                                                orderId.current = item.order_id;
                                                                handleOpen();
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="rounded-md bg-gradient-to-r from-red-900 to-red-500 px-4 py-2 text-center font-normal text-white"
                                                            >
                                                                Cancel
                                                            </Typography>
                                                        </button>
                                                    )}
                                                    {item.status === orderStatus.DELIVERED && checkCanReview(item.order_id) === true && (
                                                        <a href={`/review/${item.order_id}`}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="rounded-md bg-gradient-to-r from-green-900 to-green-500 px-4 py-2 text-center font-normal text-white"
                                                            >
                                                                Review
                                                            </Typography>
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <CancelModal open={open} handleOpen={handleOpen} onCancelPress={handleCancel} />
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(OrdersHistory);
