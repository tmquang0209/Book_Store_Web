import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfileMenu from "../../components/Navbar/profileMenu";
import { getProvinces } from "../../API/province";
import SearchBox from "../../components/Common/search";
import { updateAddress } from "../../API/user";
import { updateInfo } from "../../components/Store/Actions/authActions";

const Address = (props) => {
    const { auth, updateInfo } = props;

    const [address, setAddress] = useState({
        address: "",
        ward: {
            value: "",
            label: "Select ward",
        },
        district: {
            value: "",
            label: "Select district",
        },
        province: {
            value: "",
            label: "Select province",
        },
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const onProvinceChange = (value) => {
        setAddress({ ...address, province: value });
        const getDistricts = provinces.find((item) => item.codename === value.value);
        setDistricts(getDistricts?.districts || []);
    };

    const onDistrictChange = (value) => {
        setAddress({ ...address, district: value });
        const getWards = districts.find((item) => item.codename === value.value);
        setWards(getWards?.wards || []);
    };

    const onWardChange = (value) => {
        setAddress({ ...address, ward: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clean = {
            address: address.address,
            ward: address.ward?.value || "",
            district: address.district?.value || "",
            province: address.province?.value || "",
        };

        // update to db
        const res = await updateAddress(clean);
        console.log(res);
        const message = document.getElementById("message");
        if (res.success) {
            message.innerHTML = `<div class="bg-green-500 text-white p-2 rounded-md">${res.message}</div>`;
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            message.innerHTML = `<div class="bg-red-500 text-white p-2 rounded-md">${res.message}</div>`;
        }
        message.classList.add("mb-5");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const provincesList = await getProvinces();

                const userAddress = auth?.user?.address;

                if (userAddress && provincesList) {
                    const province = provincesList.find((item) => item.codename === userAddress.province);
                    const district = province.districts.find((item) => item.codename === userAddress.district);
                    const ward = district.wards.find((item) => item.codename === userAddress.ward);

                    setAddress({
                        address: userAddress.address,
                        province: { value: userAddress.province, label: province.name },
                        district: { value: userAddress.district, label: district.name },
                        ward: { value: userAddress.ward, label: ward.name },
                    });

                    setProvinces(provincesList);
                    setDistricts(province.districts);
                    setWards(district.wards);
                }
            } catch (error) {
                // Handle errors if needed
                console.log(error);
            }
        };

        return () => fetchData();
    }, [auth]);

    return (
        <>
            <Navbar />
            <div className="container py-10">
                <div className="flex flex-col sm:flex-row">
                    <div className="w-[300px] px-10 sm:border-r">
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <h2>{auth?.user?.first_name}</h2>
                        <ProfileMenu />
                    </div>
                    <div id="detail" className="ml-5 flex w-auto flex-col pr-10">
                        <h1 className="text-2xl font-bold">Address</h1>
                        <hr className="py-2" />
                        <div id="message"></div>
                        <form className="flex flex-col gap-5">
                            <div className="flex flex-wrap lg:gap-10">
                                <label className="w-32">Address</label>
                                <input
                                    className="w-full rounded-[7px] border p-2 sm:w-[300px]"
                                    placeholder="Address"
                                    value={address.address}
                                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-wrap lg:gap-10">
                                <label className="w-32">Province</label>
                                <div className="w-full sm:w-[300px]">
                                    <SearchBox
                                        key={"province"}
                                        value={address.province}
                                        options={provinces.map((item) => ({ value: item.codename, label: item.name }))}
                                        onChange={onProvinceChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap lg:gap-10">
                                <label className="w-32">District</label>
                                <div className="w-full sm:w-[300px]">
                                    <SearchBox
                                        key={"district"}
                                        value={address.district}
                                        options={districts?.map((item) => ({ value: item.codename, label: item.name })) || []}
                                        onChange={onDistrictChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between lg:gap-10">
                                <label className="w-32">Ward</label>
                                <div className="w-full sm:w-[300px]">
                                    <SearchBox
                                        key={"ward"}
                                        value={address.ward}
                                        options={wards.map((item) => ({ value: item.codename, label: item.name }))}
                                        onChange={onWardChange}
                                    />
                                </div>
                            </div>
                            <button onClick={handleSubmit} className="rounded-full bg-gradient-to-r from-primary to-secondary p-2 text-white">
                                Update
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

export default connect(mapStateToProps, { updateInfo })(Address);
