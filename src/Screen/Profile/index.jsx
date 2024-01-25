import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { updateInfo } from "../../components/Store/Actions/authActions";

import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { updateUserInfo } from "../../API/user";

const inputList = [
    { name: "email", type: "email", placeholder: "Email", disabled: true },
    { name: "firstName", type: "text", placeholder: "First name" },
    { name: "lastName", type: "text", placeholder: "Last name" },
    { name: "phoneNumber", type: "text", placeholder: "Phone number" },
    { name: "birthDay", type: "date", placeholder: "Birthday" },
    { name: "gender", type: "radio", placeholder: "Gender", options: ["Male", "Female", "Other"] },
];

const Profile = (props) => {
    const { auth, updateInfo } = props;

    const [userInfo, setUserInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDay: "2000-01-01",
        gender: "",
    });

    const updateBtn = document.getElementById("updateBtn");

    // add event listener to updateBtn or enter
    updateBtn &&
        updateBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("update");

            // Get form data directly from the event object
            const formData = new FormData(e.target.form);
            const updatedUserInfo = {
                email: formData.get('email'),
                first_name: formData.get('firstName'),
                last_name: formData.get('lastName'),
                telephone: formData.get('phoneNumber'),
                birthday: formData.get('birthDay'),
                gender: formData.get('gender'),
                user_id: auth.user.user_id,
            };

            const res = await updateUserInfo(updatedUserInfo);
            const message = document.getElementById("message");
            if (res.success) {
                message.innerHTML = `<div class="bg-green-500 text-white p-2 rounded-md">${res.message}</div>`;
                updateInfo(res.data);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                message.innerHTML = `<div class="bg-red-500 text-white p-2 rounded-md">${res.message}</div>`;
            }
            message.classList.add("mb-5");
        });

    const onFieldChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (auth.isAuth) {
                setUserInfo({
                    ...userInfo,
                    email: auth.user.email,
                    firstName: auth.user.first_name,
                    lastName: auth.user.last_name,
                    phoneNumber: auth.user.telephone,
                    birthDay: auth.user.birthday,
                    gender: auth.user?.gender,
                });
            } else {
                window.location.href = "/";
            }
        }, 500);

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
                        <h2>Full name</h2>
                        <ul className="flex flex-col gap-4 py-10">
                            <li className="flex items-center gap-2">
                                <FaRegUser /> My account
                            </li>
                            <li className="flex items-center gap-2">
                                <FiShoppingCart /> Orders
                            </li>
                        </ul>
                    </div>
                    <div id="detail" className="ml-5 flex w-auto flex-col pr-10">
                        <h1 className="text-2xl font-bold">My profile</h1>
                        <hr className="py-2" />
                        <div id="message"></div>
                        <form className="flex flex-col items-center gap-5">
                            {inputList.map((input, index) => (
                                <div className="flex flex-wrap lg:gap-10" key={index.toString()}>
                                    <label className="w-32" key={input.placeholder}>
                                        {input.placeholder}
                                    </label>
                                    {input.options ? (
                                        <div className="grid grid-cols-3 gap-10">
                                            {input.options.map((option, index) => (
                                                <div className="flex items-center gap-2" key={index.toString()}>
                                                    <input
                                                        key={index.toString()}
                                                        type={input.type}
                                                        name={input.name}
                                                        value={option}
                                                        checked={option === userInfo.gender}
                                                        onChange={onFieldChange}
                                                    />
                                                    <label>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <input
                                            className="w-full rounded-[7px] border p-2 sm:w-[300px]"
                                            placeholder={input.placeholder}
                                            type={input.type}
                                            name={input.name}
                                            value={userInfo[input.name]}
                                            onChange={onFieldChange}
                                        />
                                    )}
                                </div>
                            ))}
                            <button id="updateBtn" className="rounded-full bg-gradient-to-r from-primary to-secondary p-2 text-white">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { updateInfo })(Profile);
