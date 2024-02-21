import React, { useState } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfileMenu from "../../components/Navbar/profileMenu";
import { changePassword } from "../../API/user";

const ChangePassword = (props) => {
    const { auth } = props;

    const [password, setPassword] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = document.getElementById("message");
        if (password.new_password !== password.confirm_password) {
            message.innerHTML = `<div class="rounded-md bg-red-500 p-2 text-white">New password and confirm password must be the same</div>`;
            return;
        }

        if (password.new_password.length < 6) {
            message.innerHTML = `<div class="rounded-md bg-red-500 p-2 text-white">New password must be at least 6 characters long</div>`;
            return;
        }

        if (password.old_password === password.new_password) {
            message.innerHTML = `<div class="rounded-md bg-red-500 p-2 text-white">New password must be different from old password</div>`;
            return;
        }

        message.innerHTML = "";
        setDisabled(true);
        const response = await changePassword(password);
        if (response.success) {
            message.innerHTML = response.message;
            setPassword({
                old_password: "",
                new_password: "",
                confirm_password: "",
            });
            message.innerHTML = `<div class="rounded-md bg-green-500 p-2 text-white">${response.message}</div>`;
        } else {
            message.innerHTML = `<div class="rounded-md bg-red-500 p-2 text-white">${response.message}</div>`;
        }
        setDisabled(false);
    };

    return (
        <>
            <Navbar />
            <div className="container py-20">
                <div className="flex flex-col sm:flex-row">
                    <div className="w-[300px] px-10 sm:border-r">
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <h2>{auth?.user?.first_name}</h2>
                        <ProfileMenu />
                    </div>
                    <div id="detail" className="ml-5 flex w-auto flex-col pr-10">
                        <h1 className="text-2xl font-bold">Change Password</h1>
                        <hr className="py-2" />
                        <div id="message"></div>
                        <form className="mt-5 flex flex-col gap-5">
                            <div className="flex flex-wrap lg:gap-10">
                                <label className="w-32">Old password</label>
                                <input
                                    className="w-full rounded-[7px] border p-2 sm:w-[300px]"
                                    placeholder="Old password"
                                    value={password.old_password}
                                    onChange={(e) => setPassword({ ...password, old_password: e.target.value })}
                                    type="password"
                                />
                            </div>
                            <div className="flex flex-wrap lg:gap-10">
                                <label className="w-32">New password</label>
                                <input
                                    className="w-full rounded-[7px] border p-2 sm:w-[300px]"
                                    placeholder="New password"
                                    value={password.new_password}
                                    onChange={(e) => setPassword({ ...password, new_password: e.target.value })}
                                    type="password"
                                />
                            </div>

                            <div className="flex flex-wrap lg:gap-10">
                                <label className="w-32">Confirm password</label>
                                <input
                                    className="w-full rounded-[7px] border p-2 sm:w-[300px]"
                                    placeholder="Confirm password"
                                    value={password.confirm_password}
                                    onChange={(e) => setPassword({ ...password, confirm_password: e.target.value })}
                                    type="password"
                                />
                            </div>

                            <button
                                disabled={disabled}
                                onClick={handleSubmit}
                                className="rounded-full bg-gradient-to-r from-primary to-secondary p-2 text-white"
                            >
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(ChangePassword);
