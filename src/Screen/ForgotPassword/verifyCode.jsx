import React, { useState } from "react";
import { Input } from "@material-tailwind/react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { forgotPassword, verifyCode } from "../../API/user";

const VerifyCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    const [code, setCode] = useState("");

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleResend = async (e) => {
        e.preventDefault();
        const response = await forgotPassword(username);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (code === "") {
            toast.error("Code is required");
        }

        if (code.length < 6) {
            toast.error("Code must be 6 characters long");
        }

        if (code.length === 6) {
            const response = await verifyCode(username, code);
            if (response.success) {
                toast.success(response.message);
                setTimeout(() => {
                    window.location.href = `/reset_password?username=${username}&code=${code}&type=forgot_password`;
                }, 3000);
            } else {
                toast.error(response.message);
            }
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
                                label="Code"
                                type="text"
                                id="code"
                                name="code"
                                className="w-full border border-gray-300 p-2"
                                placeholder="Code"
                                onChange={handleCodeChange}
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full max-w-[200px] rounded-2xl bg-transparent bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white"
                        >
                            Verify
                        </button>
                        <p className="mt-5 text-center">
                            Didn't receive the code?{" "}
                            <button onClick={handleResend} className="text-primary hover:cursor-pointer">
                                Resend
                            </button>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default VerifyCode;
