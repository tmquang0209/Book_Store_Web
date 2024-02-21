import React, { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { signupUser } from "../../API/user";

const inputData = [
    {
        type: "text",
        name: "first_name",
        placeholder: "First Name",
    },
    {
        type: "text",
        name: "last_name",
        placeholder: "Last Name",
    },
    {
        type: "text",
        name: "username",
        placeholder: "Username",
    },
    {
        type: "email",
        name: "email",
        placeholder: "Email",
    },
    {
        type: "tel",
        name: "telephone",
        placeholder: "Phone Number",
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
    },
    {
        type: "password",
        name: "confirm_password",
        placeholder: "Confirm Password",
    },
];

const Signup = () => {
    const [userData, setUserData] = useState({});

    const onFieldChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirm_password) {
            toast.error("Password and Confirm Password should be same");
            return;
        }

        try {
            const response = await signupUser(userData);
            if (response.success) {
                toast.success(response.message);
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-10">
                <h1 className="text-center text-3xl font-bold">Signup</h1>
                <div className="m-10 mx-5">
                    <form className="m-5 flex flex-col items-center justify-center">
                        {inputData.map((data, index) => (
                            <div className="mx-5 mb-5 w-full max-w-[400px]" key={index}>
                                <Input
                                    label={data.placeholder}
                                    type={data.type}
                                    placeholder={data.placeholder}
                                    onChange={onFieldChange}
                                    className="w-full rounded p-3"
                                    name={data.name}
                                    value={userData[data.name] || ""}
                                />
                            </div>
                        ))}
                        <div className="mx-5 mb-5 w-full max-w-[400px]">
                            <button
                                onClick={handleSignup}
                                className="w-full rounded bg-indigo-500 p-3 text-white transition duration-200 hover:bg-indigo-600"
                            >
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Signup;
