import React, { useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../Store/Actions/authActions";
import { Input } from "@material-tailwind/react";

import { Modal } from "../Modal";
import SignupForm from "./signupForm";

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

    const [loginInfo, setLoginInfo] = React.useState({
        username: "",
        password: "",
        message: "",
    });

    const [isOpen, setIsOpen] = React.useState(false);

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
            {loginInfo.message && (
                <span className={`mb-2 flex rounded-md ${auth.isAuth ? "bg-green-300" : "bg-red-300"} p-2 text-white`}>{loginInfo?.message}</span>
            )}
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
                    <button>Forgot password?</button>
                </div>

                <div className="grid grid-cols-1 gap-4 divide-y-2">
                    <button
                        type="submit"
                        className="w-full rounded-md bg-gradient-to-r from-primary to-secondary p-2 text-white"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <button type="submit" className="w-full" onClick={handleSignup}>
                        Register
                    </button>
                </div>
                <div></div>
            </form>
            {isOpen && <Modal modal={isOpen} setModal={setIsOpen} headerTitle="Login" body={<SignupForm handleToggle={handleToggle} />} />}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { login })(LoginForm);
