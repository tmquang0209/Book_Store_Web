import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { getCartFromLocalStorage, clearCart } from "../../components/Store/Actions/cartAction";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Card, Typography } from "@material-tailwind/react";
import { currencyFormat } from "../../components/Common/formatNumber";
import { getProductDetail } from "../../API/product";
import { getProvinces } from "../../API/province";
import { createOrder } from "../../API/order";
import SearchBox from "../../components/Common/search";

const head = ["Product name", "Qty", "Price", "Total"];

const Payment = (props) => {
    const { auth, cart, getCartFromLocalStorage, clearCart } = props;

    const [personalInfo, setPersonalInfo] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        province: "",
        district: "",
        ward: "",
        address: "",
    });

    const [payment, setPayment] = useState("cash");

    const [emptyField, setEmptyField] = useState({
        first_name: false,
        last_name: false,
        phone_number: false,
        province: false,
        district: false,
        ward: false,
        address: false,
    });

    const [products, setProducts] = useState([]);
    const total = useRef(0);

    const [provinces, setProvinces] = useState([]);

    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const getProducts = async () => {
        const tempProducts = [];
        if (cart.cart.length !== 0) {
            for (const item of cart.cart) {
                const response = await getProductDetail(item.product_id);
                const product = response.data;
                product.max = product.quantity.inStock;
                product.quantity = item.quantity;
                tempProducts.push(product);
            }
            setProducts(tempProducts);
            total.current = tempProducts.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        } else {
            setProducts([]);
            total.current = 0;
        }
    };

    const getProvincesList = async () => {
        const response = await getProvinces();
        setProvinces(response);
    };

    const onFieldChange = (event) => {
        setPersonalInfo({
            ...personalInfo,
            [event.target.name]: event.target.value,
        });
    };

    const onProvinceChange = (value) => {
        setPersonalInfo({ ...personalInfo, province: value, district: "", ward: "" });

        setDistricts(provinces.find((item) => item.codename === value.value).districts);
    };

    const onDistrictChange = (value) => {
        setPersonalInfo({ ...personalInfo, district: value, ward: "" });

        setWards(districts.find((item) => item.codename === value.value).wards);
    };

    const onWardChange = (value) => {
        setPersonalInfo({ ...personalInfo, ward: value });
    };

    const onPaymentPress = async () => {
        //check empty
        personalInfo.first_name === "" ? setEmptyField({ ...emptyField, first_name: true }) : setEmptyField({ ...emptyField, first_name: false });
        personalInfo.last_name === "" ? setEmptyField({ ...emptyField, last_name: true }) : setEmptyField({ ...emptyField, last_name: false });
        personalInfo.phone_number === ""
            ? setEmptyField({ ...emptyField, phone_number: true })
            : setEmptyField({ ...emptyField, phone_number: false });
        personalInfo.province === "" ? setEmptyField({ ...emptyField, province: true }) : setEmptyField({ ...emptyField, province: false });
        personalInfo.district === "" ? setEmptyField({ ...emptyField, district: true }) : setEmptyField({ ...emptyField, district: false });
        personalInfo.ward === "" ? setEmptyField({ ...emptyField, ward: true }) : setEmptyField({ ...emptyField, ward: false });
        personalInfo.address === "" ? setEmptyField({ ...emptyField, address: true }) : setEmptyField({ ...emptyField, address: false });

        const message = document.getElementById("message");
        if (
            emptyField.first_name ||
            emptyField.last_name ||
            emptyField.phone_number ||
            emptyField.province ||
            emptyField.district ||
            emptyField.ward ||
            emptyField.address
        ) {
            message.classList.remove("hidden");
            message.classList.add("opacity-100");
            message.innerText = "Please fill all the fields";
            return;
        }

        //format data
        const data = {
            contact: {
                full_name: personalInfo.first_name + " " + personalInfo.last_name,
                phone_number: personalInfo.phone_number,
                email: auth.user.email,
            },
            address: {
                province: personalInfo.province.value,
                district: personalInfo.district.value,
                ward: personalInfo.ward.value,
                address: personalInfo.address,
            },
            payment: "cash",
            products: products.map((item) => ({ product_id: item.product_id, quantity: item.quantity, price: item.price })),
        };

        // send to server
        const response = await createOrder(auth.user.token, data);
        console.log(response);
        if (response.success) {
            message.classList.remove("hidden");
            message.classList.remove("bg-red-500");
            message.classList.add("bg-green-500");
            message.innerText = "Payment success";
            clearCart();
            window.location.href = "/orders_history";
        } else {
            message.classList.remove("hidden");
            message.classList.add("opacity-100");
            message.innerText = "Payment failed";
        }

        //if true=> alert success => redirect to order history
        // clear cart
    };

    useEffect(() => {
        getCartFromLocalStorage();
        getProducts();
        getProvincesList();
    }, []);

    useEffect(() => {
        getProducts();
    }, [cart]);

    useEffect(() => {}, [auth]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (auth.user) {
                setPersonalInfo({
                    ...personalInfo,
                    first_name: auth.user.first_name,
                    last_name: auth.user.last_name,
                    phone_number: auth.user.telephone,
                });
            } else {
                window.location.href = "/";
            }
        }, 500);

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [auth]);

    return (
        <>
            <Navbar />
            <div className="container my-10">
                <div>
                    {/* list */}
                    <h1 className="mb-3 text-2xl font-bold">Payment</h1>
                    <div
                        id="message"
                        className="relative mb-4 hidden w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100"
                    ></div>
                    <div className="mb-10 flex flex-col gap-5">
                        <h1 className="text-xl font-bold">Personal Information</h1>
                        <form className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                                <div className="w-full">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" "
                                            name="first_name"
                                            value={personalInfo.first_name}
                                            onChange={onFieldChange}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-blue-gray-200 before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            First name
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" "
                                            name="last_name"
                                            value={personalInfo.last_name}
                                            onChange={onFieldChange}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-blue-gray-200 before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Last name
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" "
                                            name="phone_number"
                                            value={personalInfo.phone_number}
                                            onChange={onFieldChange}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-blue-gray-200 before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Phone number
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="w-full">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <SearchBox
                                            key={"province"}
                                            value={personalInfo.province}
                                            onChange={onProvinceChange}
                                            options={provinces.map((item) => ({ value: item.codename, label: item.name }))}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <SearchBox
                                            key={"district"}
                                            value={personalInfo.district}
                                            onChange={onDistrictChange}
                                            options={districts.map((item) => ({ value: item.codename, label: item.name }))}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <SearchBox
                                            key={"ward"}
                                            value={personalInfo.ward}
                                            onChange={onWardChange}
                                            options={wards.map((item) => ({ value: item.codename, label: item.name }))}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" "
                                            name="address"
                                            onChange={onFieldChange}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-blue-gray-200 before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Address
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Card className="no-scrollbar w-full overflow-auto rounded-md">
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
                            <tbody>
                                {products &&
                                    products.map((item, index) => (
                                        <tr className="even:bg-blue-gray-50/50" key={index}>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.name}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {item.quantity}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {currencyFormat(item.price)}
                                                </Typography>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {currencyFormat(item.price * item.quantity)}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                            <tfoot>
                                <tr className="gap-5 border-t">
                                    <td></td>
                                    <td></td>
                                    <td className="py-5 pr-10 text-center font-bold">Total</td>
                                    <td className="text-center font-bold">{currencyFormat(total.current)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </Card>
                    <div className="mt-5 flex gap-5">
                        <span className="font-bold">Payment method:</span>
                        <div className="flex gap-5">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    id="paypal"
                                    value="paypal"
                                    checked={payment === "paypal"}
                                    onChange={(e) => setPayment(e.target.value)}
                                    disabled
                                />
                                <label htmlFor="paypal">Paypal</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    id="cardPayment"
                                    value="cardPayment"
                                    checked={payment === "cardPayment"}
                                    onChange={(e) => setPayment(e.target.value)}
                                    disabled
                                />
                                <label htmlFor="stripe">Card payment</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    id="cash"
                                    value="cash"
                                    checked={payment === "cash"}
                                    onChange={(e) => setPayment(e.target.value)}
                                />
                                <label htmlFor="cash">Cash</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex w-full justify-end">
                        <button
                            onClick={onPaymentPress}
                            className="translate rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white"
                        >
                            <span>Payment now</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    cart: state.cart,
});

export default connect(mapStateToProps, { getCartFromLocalStorage, clearCart })(Payment);
