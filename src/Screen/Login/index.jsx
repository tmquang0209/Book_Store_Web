import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";

import { login } from "../../components/Store/Actions/authActions";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Login = (props) => {
    const { auth, login } = props;

    const [info, setInfo] = useState({
        username: "",
        password: "",
    });

    const handleInfoChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(info);
        if (info.username === "" || info.password === "") {
            toast.error("Username and Password is required");
            return;
        }

        try {
            await login(info);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (auth.message && !auth.isAuth) {
            toast.error(auth.message);
        } else if (auth.isAuth) {
            toast.success(auth.message);
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        }
    }, [auth.message, auth.isAuth]);

    return (
        <>
            <Navbar />
            <div className="container py-10">
                <h1 className="text-center text-3xl font-bold">Login</h1>
                <div className="m-10 mx-5">
                    <form className="m-5 flex flex-col items-center justify-center">
                        <div className="mx-5 mb-5 w-full max-w-[400px]">
                            <Input
                                onChange={handleInfoChange}
                                label="Username"
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="w-full border border-gray-300 p-2"
                            />
                        </div>
                        <div className="mx-5 mb-5 w-full max-w-[400px]">
                            <Input
                                onChange={handleInfoChange}
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full border border-gray-300 p-2"
                            />
                        </div>
                        <div className="mx-5 mb-5 w-full max-w-[400px]">
                            <button
                                onClick={handleLogin}
                                className="w-full rounded-md bg-transparent bg-gradient-to-tr from-primary to-secondary p-2 text-white"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div>
                        <p className="text-center">
                            Don't have an account?{" "}
                            <a href="/signup" className="text-primary hover:cursor-pointer">
                                Register
                            </a>
                        </p>
                        <p className="text-center">
                            Forgot your password?{" "}
                            <a href="/forgot_password" className="text-primary hover:cursor-pointer">
                                Reset
                            </a>
                        </p>
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

export default connect(mapStateToProps, { login })(Login);
