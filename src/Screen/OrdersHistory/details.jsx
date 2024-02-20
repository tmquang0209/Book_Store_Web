import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { currencyFormat } from "../../components/Common/formatNumber";
import { Typography } from "@material-tailwind/react";
import { cancelOrder, getOrderDetails } from "../../API/order";
import { useParams } from "react-router-dom";
import { fullDate } from "../../components/Common/date";
import { orderStatus } from "../../components/Constants/text";
import { getDistrictName, getProvinceName, getWardName } from "../../components/Common/province";
import DeliveryTimeline from "./deliveryTimeline";
import CancelModal from "./cancelModal";

const head = ["No", "Product name", "Quantity", "Price", "Total"];

const OrderDetails = (props) => {
    const { auth } = props;
    const { id } = useParams();

    const [details, setDetails] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((prev) => !prev);

    const total = useRef(0);

    const goBack = () => window.history.back();

    const fetchOrderDetails = async () => {
        const res = await getOrderDetails(id);
        console.log(res);
        if (res.success) {
            const provinceName = await getProvinceName(res.data.address.province);
            const districtName = await getDistrictName(res.data.address.province, res.data.address.district);
            const wardName = await getWardName(res.data.address.province, res.data.address.district, res.data.address.ward);

            setDetails({ ...res.data, address: { ...res.data.address, province: provinceName, district: districtName, ward: wardName } });

            total.current = res.data.products.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0);
        }
    };

    const onCancelPress = async () => {
        const res = await cancelOrder(id);
        console.log(res);
        if (res.success) {
            fetchOrderDetails();
            handleOpen();
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!auth.isAuth) {
                window.location.href = "/";
            }
            fetchOrderDetails();
        }, 1000);

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [auth.isAuth, auth.user]);

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div>
                    <button onClick={goBack} className="flex items-center text-lg hover:text-primary">
                        <IoIosArrowBack />
                        Go back
                    </button>
                </div>
                <div className="mb-5 flex flex-col gap-5">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Order ID: #{id}</h1>
                        {details.status === "pending" && (
                            <button onClick={handleOpen} className="rounded-md bg-gradient-to-r from-red-600 to-red-300 px-2 py-2 text-white">
                                Cancel
                            </button>
                        )}
                    </div>
                    <div className="flex gap-10">
                        <p className="border-r pr-10">
                            Order date: <span className="font-bold">{fullDate(details?.created_at)}</span>
                        </p>
                        <p>
                            Order status:{" "}
                            <span className={`font-bold ${details?.status === orderStatus.CANCELED ? "text-red-500" : "text-green-500"}`}>
                                {details?.status?.toUpperCase()}
                            </span>
                        </p>
                    </div>
                </div>
                <hr />
                <DeliveryTimeline status={details.status} data={details.shipping_log} />
                <hr />
                <div className="py-10">
                    <table className="w-full table-auto rounded-md">
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
                            {details?.products?.map((item, index) => (
                                <tr className="even:bg-blue-gray-50/50" key={index}>
                                    <td>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.name || "No name"}
                                        </Typography>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.quantity}
                                        </Typography>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {currencyFormat(item?.price || 0)}
                                        </Typography>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {currencyFormat(item?.price * item?.quantity || 0)}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="gap-5 border-t">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="py-2 pr-10 text-center font-bold">Tax</td>
                                <td className="text-center font-bold">{currencyFormat(details.taxCost || 0)}</td>
                            </tr>
                            <tr className="gap-5">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="border-t py-2 pr-10 text-center font-bold">Ship cost</td>
                                <td className="border-t text-center font-bold">{currencyFormat(details.shipping_cost)}</td>
                            </tr>
                            <tr className="gap-5">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="border-t py-2 pr-10 text-center font-bold">Total</td>
                                <td className="border-t text-center font-bold">{currencyFormat(total.current)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div>
                        <h2 className="text-xl font-bold">Payment</h2>
                        <div>
                            <p>
                                Payment method: <span className="text-lg font-bold">{details?.payment?.toUpperCase()}</span>
                            </p>
                            <p>Payment status: </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Delivery </h2>
                        <p className="italic text-gray-500">Name</p>
                        <p>{details?.contact?.full_name}</p>
                        <p className="italic text-gray-500">Address</p>
                        <p>
                            {details?.address?.address}, {details?.address?.ward}, {details?.address?.district}, {details?.address?.province}
                        </p>
                        <p className="italic text-gray-500">Phone number</p>
                        <p>{details?.contact?.phone_number}</p>
                    </div>
                </div>
            </div>
            <Footer />
            <CancelModal open={open} handleOpen={handleOpen} onCancelPress={onCancelPress} />
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(OrderDetails);
