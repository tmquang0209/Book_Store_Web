import React, { useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../Store/Actions/authActions";

const LoginForm = (props) => {
    const { auth, login } = props;

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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(loginInfo);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setLoginInfo((prevLoginInfo) => ({ ...prevLoginInfo, message: auth.message }));
    }, [auth.message]);

    return (
        <>
            {loginInfo.message && (
                <span className={`mb-2 flex rounded-md ${auth.isAuth ? "bg-green-300" : "bg-red-300"} p-2 text-white`}>{loginInfo?.message}</span>
            )}
            <form>
                {fields.map((field, index) => (
                    <div className="mb-3 flex items-center justify-center" key={index}>
                        <label htmlFor={field.name} className="w-20">
                            {field.placeholder}
                        </label>
                        <input
                            type={field.type}
                            id={field.name}
                            className="ml-2 border-spacing-4 rounded-md border border-gray-300 p-1"
                            placeholder={field.placeholder}
                            onChange={field.onChange}
                        />
                    </div>
                ))}
                <div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-gradient-to-r from-primary to-secondary p-2 text-white"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
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
