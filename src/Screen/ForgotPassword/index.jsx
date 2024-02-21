import React, { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Input } from "@material-tailwind/react";
import { forgotPassword } from "../../API/user";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [username, setUsername] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await forgotPassword(username);
        if (response.success) {
            toast.success(response.message);
            setTimeout(() => {
                window.location.href = `/verify_code?username=${username}&type=forgot_password`;
            }, 3000);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-10">
                <h1 className="text-center text-3xl font-bold">Forgot Password</h1>
                <div className="m-10 mx-5">
                    <form className="m-5 flex flex-col items-center justify-center">
                        <div className="mx-5 mb-5 w-full max-w-[400px]">
                            <Input
                                label="Username"
                                onChange={handleUsernameChange}
                                type="text"
                                id="username"
                                name="username"
                                className="w-full border border-gray-300 p-2"
                                placeholder="Username"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="w-full max-w-[200px] rounded-2xl bg-transparent bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ForgotPassword;
