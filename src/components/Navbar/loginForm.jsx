import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { login } from "../Store/Actions/authActions";
import { Input } from "@material-tailwind/react";
import { Toast } from "../Common/toast";

const LoginForm = (props) => {
    const { auth, login, handleToggle } = props;

    const fields = [
        {
            name: "username",
            type: "text",
            placeholder: "Username",
            onChange: (e) => setLoginInfo({ ...loginInfo, message: "", username: e.target.value }),
        },
        {
            name: "password",
            type: "password",
            placeholder: "Password",
            onChange: (e) => setLoginInfo({ ...loginInfo, message: "", password: e.target.value }),
        },
    ];

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        message: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(loginInfo);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        handleToggle("SignupForm");
    };

    useEffect(() => {
        setLoginInfo((prevLoginInfo) => ({ ...prevLoginInfo, message: auth.message }));
        if (auth.isAuth) {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }, [auth.message, auth.isAuth]);

    return (
        <>
            {loginInfo.message && <Toast message={loginInfo.message} type={auth.isAuth} />}
            <form className="s:w-[300px] sm:min-w-[400px]">
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
                <div className="mb-2 flex items-end justify-end">
                    <a href="/forgot_password" className="hover:text-primary">
                        Forgot password?
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-4 divide-y-2">
                    <button
                        type="submit"
                        className="w-full rounded-md bg-gradient-to-r from-primary to-secondary p-2 text-white"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <button type="submit" className="w-full hover:text-primary" onClick={handleSignup}>
                        Register
                    </button>
                </div>
                <div></div>
            </form>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { login })(LoginForm);
