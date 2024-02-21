import React, { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { createNewPassword } from "../../API/user";

const ResetPassword = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    const code = urlParams.get("code");

    const [password, setPassword] = useState({
        password: "",
        confirm_password: "",
    });

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.password === "" || password.confirm_password === "") {
            toast.error("Password and Confirm Password is required");
            return;
        } else if (password.password !== password.confirm_password) {
            toast.error("Password and Confirm Password should be same");
            return;
        }

        const response = await createNewPassword(username, password.password, password.confirm_password, code);
        if (response.success) {
            toast.success(response.message);
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-10">
                <h1 className="text-center text-3xl font-bold">Verify Code</h1>
                <div className="m-10 mx-5">
                    <form className="m-5 flex flex-col items-center justify-center">
                        <div className="mx-5 mb-5 w-full max-w-[400px]">
                            <Input
                                label="Username"
                                id="username"
                                name="username"
                                className="w-full border border-gray-300 p-2"
                                value={username}
                                disabled
                            />
                        </div>
                        <div className="mx-5 mb-5 w-full max-w-[400px]">
                            <Input
                                label="New Password"
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 p-2"
                                placeholder="New Password"
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="mx-5 mb-5 w-full max-w-[400px]">
                            <Input
                                label="Confirm Password"
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                className="w-full border border-gray-300 p-2"
                                placeholder="Confirm Password"
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="w-full max-w-[200px] rounded-2xl bg-transparent bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white"
                        >
                            Reset password
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ResetPassword;
