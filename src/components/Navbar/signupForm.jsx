import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";

import { signupUser } from "../../API/user";

const SignupForm = (props) => {
    const { handleToggle } = props;

    const fields = [
        {
            placeholder: "First name",
            type: "text",
            name: "firstName",
            onChange: (e) => {
                setSignupInfo({ ...signupInfo, first_name: e.target.value });
                setMessage({ status: false, message: "" });
            },
        },
        {
            placeholder: "Last name",
            type: "text",
            name: "lastName",
            onChange: (e) => {
                setSignupInfo({ ...signupInfo, last_name: e.target.value });
                setMessage({ status: false, message: "" });
            },
        },
        {
            placeholder: "Username",
            type: "text",
            name: "username",
            onChange: (e) => {
                setSignupInfo({ ...signupInfo, username: e.target.value });
                setMessage({ status: false, message: "" });
            },
        },
        {
            placeholder: "Phone number",
            type: "text",
            name: "telephone",
            onChange: (e) => {
                setSignupInfo({ ...signupInfo, telephone: e.target.value });
                setMessage({ status: false, message: "" });
            },
        },
        {
            placeholder: "Password",
            type: "password",
            name: "password",
            onChange: (e) => {
                setSignupInfo({ ...signupInfo, password: e.target.value });
                setMessage({ status: false, message: "" });
            },
        },
        {
            placeholder: "Re-password",
            type: "password",
            name: "rePassword",
            onChange: (e) => {
                setSignupInfo({ ...signupInfo, re_password: e.target.value });
                setMessage({ status: false, message: "" });
            },
        },
    ];

    const [signupInfo, setSignupInfo] = useState({
        username: "",
        password: "",
        re_password: "",
        first_name: "",
        last_name: "",
        telephone: "",
    });

    const [message, setMessage] = useState({ status: false, message: "" });

    const handleSignup = (e) => {
        e.preventDefault();

        // check password match
        if (signupInfo.password !== signupInfo.re_password) {
            setMessage({ status: false, message: "Password does not match!" });
            return;
        }

        const fetchSignup = async () => {
            const res = await signupUser(signupInfo);
            setMessage({ status: res.success, message: res.message });
        };

        fetchSignup();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        handleToggle("LoginForm");
    };

    useEffect(() => {
        if (message.status) {
            setTimeout(() => {
                handleToggle("LoginForm");
            }, 2000);
        }
    }, [message.status]);

    return (
        <>
            {message.message && (
                <span className={`mb-2 flex rounded-md ${message.status ? "bg-green-300" : "bg-red-300"} p-2 text-white`}>{message?.message}</span>
            )}
            <form className="s:w-[300px] sm:min-w-[400px]">
                <div className="grid grid-cols-2 gap-3">
                    {fields.map((field, index) => (
                        <div className="mb-4 flex flex-col" key={index}>
                            <Input
                                size="lg"
                                label={field.placeholder}
                                type={field.type}
                                id={field.name}
                                className="w-full"
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-4 divide-y-2">
                    <button
                        type="submit"
                        className="w-full rounded-md bg-gradient-to-r from-primary to-secondary p-2 text-white"
                        onClick={handleSignup}
                    >
                        Sign up
                    </button>
                    <div className="flex justify-center pt-4">
                        <span>Already have an account?</span>
                        <button type="submit" className="ml-1 font-bold" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
                <div></div>
            </form>
        </>
    );
};

export default SignupForm;
